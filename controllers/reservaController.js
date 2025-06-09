const Reserva = require('../models/reservaModel');
const Sala = require('../models/salaModel');

exports.createReserva = async (req, res) => {
  try {
    const { sala_id, tempo_inicio, tempo_fim } = req.body;

    if (new Date(tempo_fim) <= new Date(tempo_inicio)) {
      return res.status(400).json({ message: 'O horário de término deve ser após o horário de início.' });
    }

    // Adicionar o ID do usuário da sessão
    const reservaData = {
      ...req.body,
      usuario_id: req.userId
    };

    const novaReserva = await Reserva.create(reservaData);
    res.status(201).json(novaReserva);
  } catch (error) {
    if (error.message && error.message.includes('Conflito de horário')) {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.getAll();
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.getById(req.params.id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservasByUsuarioId = async (req, res) => {
    try {
      const usuarioId = req.params.usuarioId;
      if (!usuarioId) {
        return res.status(400).json({ message: 'ID do usuário não fornecido.' });
      }
      const reservas = await Reserva.getByUsuarioId(usuarioId);
      res.status(200).json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateReserva = async (req, res) => {
  try {
    const { sala_id, tempo_inicio, tempo_fim } = req.body;
    if (new Date(tempo_fim) <= new Date(tempo_inicio)) {
        return res.status(400).json({ message: 'O horário de término deve ser após o horário de início.' });
    }

    const reservaAtualizada = await Reserva.update(req.params.id, req.body);
    if (!reservaAtualizada) {
      return res.status(404).json({ message: 'Reserva não encontrada ou não pôde ser atualizada' });
    }
    res.status(200).json(reservaAtualizada);
  } catch (error) {
    if (error.message && error.message.includes('Conflito de horário')) {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.cancelReserva = async (req, res) => {
  try {
    const usuarioId = req.body.usuario_id || req.user?.id;
    if (!usuarioId) {
    }

    const reservaCancelada = await Reserva.cancel(req.params.id, usuarioId);
    if (!reservaCancelada) {
      return res.status(404).json({ message: 'Reserva não encontrada ou você não tem permissão para cancelar' });
    }
    res.status(200).json({ message: 'Reserva cancelada com sucesso', reserva: reservaCancelada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const deletado = await Reserva.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
