const Notificacao = require('../models/notificacoesModel');

exports.getNotificacoesByUserId = async (req, res) => {
  try {
    const notificacoes = await Notificacao.getByUserId(req.params.usuarioId);
    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotificacao = async (req, res) => {
  try {
    const novaNotificacao = await Notificacao.create(req.body);
    res.status(201).json(novaNotificacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markNotificacaoAsRead = async (req, res) => {
  try {
    const notificacao = await Notificacao.markAsRead(req.params.id);
    if (!notificacao) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json(notificacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAllNotificacoesAsReadByUserId = async (req, res) => {
  try {
    const notificacoes = await Notificacao.markAllAsReadByUserId(req.params.usuarioId);
    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotificacao = async (req, res) => {
  try {
    const deletado = await Notificacao.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }
    res.status(200).json({ message: 'Notificação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
