// controllers/dashboardController.js
const dashboardService = require('../services/dashboardService');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const dashboardData = await dashboardService.getDashboardData(userId);
    
    res.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('Erro ao obter dados do dashboard:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.userId;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const stats = await dashboardService.getDashboardStats(userId);
    
    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

const getProximasReservas = async (req, res) => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 5;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuário não autenticado' 
      });
    }

    const proximasReservas = await dashboardService.getProximasReservas(userId, limit);
    
    res.json({
      success: true,
      data: proximasReservas
    });

  } catch (error) {
    console.error('Erro ao obter próximas reservas:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

const getSalasPopulares = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const salasPopulares = await dashboardService.getSalasPopulares(limit);
    
    res.json({
      success: true,
      data: salasPopulares
    });

  } catch (error) {
    console.error('Erro ao obter salas populares:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

module.exports = {
  getDashboardData,
  getStats,
  getProximasReservas,
  getSalasPopulares
};
