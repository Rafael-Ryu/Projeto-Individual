const Notificacao = require('../models/notificacoesModel');

const getAllNotificacoes = async (usuarioId) => {
  try {
    if (usuarioId) {
      return await Notificacao.getByUsuarioId(usuarioId); 
    }
    return await Notificacao.getAll();
  } catch (error) {
    throw new Error('Erro ao obter notificações: ' + error.message);
  }
};

const getNotificacaoById = async (id) => {
  try {
    return await Notificacao.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter notificação: ' + error.message);
  }
};

const createNotificacao = async (data) => {
  try {
    return await Notificacao.create(data);
  } catch (error) {
    throw new Error('Erro ao criar notificação: ' + error.message);
  }
};

const markAsRead = async (id) => {
  try {
    return await Notificacao.update(id, { is_read: true, read_em: new Date() });
  } catch (error) {
    throw new Error('Erro ao marcar notificação como lida: ' + error.message);
  }
};

const deleteNotificacao = async (id) => {
  try {
    return await Notificacao.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar notificação: ' + error.message);
  }
};

module.exports = {
  getAllNotificacoes,
  getNotificacaoById,
  createNotificacao,
  markAsRead,
  deleteNotificacao
};
