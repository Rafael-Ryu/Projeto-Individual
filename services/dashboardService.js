// services/dashboardService.js
const Reserva = require('../models/reservaModel');
const Sala = require('../models/salaModel');
const User = require('../models/userModel');

const getDashboardStats = async (userId) => {
  try {
    // Buscar todas as reservas do usuário
    const reservasUsuario = await Reserva.getByUsuarioId(userId);
    
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    
    // Calcular estatísticas
    const stats = {
      totalReservas: reservasUsuario.length,
      reservasAtivas: reservasUsuario.filter(r => 
        r.status === 'confirmado' && new Date(r.tempo_fim) > hoje
      ).length,
      proximasReservas: reservasUsuario.filter(r => 
        r.status === 'confirmado' && 
        new Date(r.tempo_inicio) >= hoje && 
        new Date(r.tempo_inicio) <= amanha
      ).length,
      salasFavoritas: 0 // Implementar lógica de favoritos depois
    };

    return stats;
  } catch (error) {
    throw new Error('Erro ao obter estatísticas do dashboard: ' + error.message);
  }
};

const getProximasReservas = async (userId, limit = 5) => {
  try {
    const reservasUsuario = await Reserva.getByUsuarioId(userId);
    const hoje = new Date();
    
    // Filtrar próximas reservas (próximos 7 dias)
    const proximasSemana = new Date(hoje);
    proximasSemana.setDate(hoje.getDate() + 7);
    
    const proximasReservas = reservasUsuario
      .filter(r => 
        r.status === 'confirmado' && 
        new Date(r.tempo_inicio) >= hoje && 
        new Date(r.tempo_inicio) <= proximasSemana
      )
      .sort((a, b) => new Date(a.tempo_inicio) - new Date(b.tempo_inicio))
      .slice(0, limit);

    return proximasReservas;
  } catch (error) {
    throw new Error('Erro ao obter próximas reservas: ' + error.message);
  }
};

const getSalasPopulares = async (limit = 5) => {
  try {
    // Buscar todas as salas
    const salas = await Sala.getAll();
    
    // Para cada sala, contar reservas do último mês
    const hoje = new Date();
    const mesPassado = new Date(hoje);
    mesPassado.setMonth(hoje.getMonth() - 1);
    
    const salasComContagem = await Promise.all(
      salas.map(async (sala) => {
        try {
          const reservasSala = await Reserva.getBySalaId(sala.id);
          const reservasUltimoMes = reservasSala.filter(r => 
            new Date(r.criado_em) >= mesPassado
          );
          
          return {
            ...sala,
            totalReservas: reservasUltimoMes.length
          };
        } catch (error) {
          return {
            ...sala,
            totalReservas: 0
          };
        }
      })
    );
    
    // Ordenar por número de reservas e retornar as mais populares
    const salasPopulares = salasComContagem
      .sort((a, b) => b.totalReservas - a.totalReservas)
      .slice(0, limit);

    return salasPopulares;
  } catch (error) {
    throw new Error('Erro ao obter salas populares: ' + error.message);
  }
};

const getNotificacoesRecentes = async (userId, limit = 5) => {
  try {
    const Notificacao = require('../models/notificacoesModel');
    const notificacoes = await Notificacao.getByUserId(userId);
    
    // Retornar as mais recentes
    const notificacoesRecentes = notificacoes
      .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
      .slice(0, limit);

    return notificacoesRecentes;
  } catch (error) {
    // Se não houver notificações, retornar array vazio
    return [];
  }
};

const getDashboardData = async (userId) => {
  try {
    const [stats, proximasReservas, salasPopulares, notificacoes] = await Promise.all([
      getDashboardStats(userId),
      getProximasReservas(userId),
      getSalasPopulares(),
      getNotificacoesRecentes(userId)
    ]);

    return {
      stats,
      proximasReservas,
      salasPopulares,
      notificacoes
    };
  } catch (error) {
    throw new Error('Erro ao obter dados do dashboard: ' + error.message);
  }
};

module.exports = {
  getDashboardStats,
  getProximasReservas,
  getSalasPopulares,
  getNotificacoesRecentes,
  getDashboardData
};
