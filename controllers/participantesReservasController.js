const ParticipantesReservas = require('../models/participantesReservasModel');

exports.createParticipanteReserva = async (req, res) => {
  try {
    const novoParticipante = await ParticipantesReservas.create(req.body);
    res.status(201).json(novoParticipante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllParticipantesReservas = async (req, res) => {
  try {
    const participantes = await ParticipantesReservas.getAll();
    res.status(200).json(participantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParticipanteReservaById = async (req, res) => {
  try {
    const participante = await ParticipantesReservas.getById(req.params.id);
    if (!participante) {
      return res.status(404).json({ message: 'Participante de reserva não encontrado' });
    }
    res.status(200).json(participante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getParticipantesByReservaId = async (req, res) => {
  try {
    const participantes = await ParticipantesReservas.getByReservaId(req.params.reservaId);
    res.status(200).json(participantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateParticipanteReserva = async (req, res) => {
  try {
    const participanteAtualizado = await ParticipantesReservas.update(req.params.id, req.body);
    if (!participanteAtualizado) {
      return res.status(404).json({ message: 'Participante de reserva não encontrado' });
    }
    res.status(200).json(participanteAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteParticipanteReserva = async (req, res) => {
  try {
    const deletado = await ParticipantesReservas.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Participante de reserva não encontrado' });
    }
    res.status(200).json({ message: 'Participante de reserva excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
