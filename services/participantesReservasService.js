const ParticipantesReservas = require('../models/participantesReservasModel');

const getAllParticipantes = async () => {
  try {
    return await ParticipantesReservas.getAll();
  } catch (error) {
    throw new Error('Erro ao obter todos os participantes de reservas: ' + error.message);
  }
};

const getParticipantesByReservaId = async (reservaId) => {
  try {
    return await ParticipantesReservas.getByReservaId(reservaId);
  } catch (error) {
    throw new Error('Erro ao obter participantes da reserva: ' + error.message);
  }
};

const getParticipanteById = async (id) => {
  try {
    return await ParticipantesReservas.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter participante da reserva: ' + error.message);
  }
};

const addParticipante = async (data) => {
  try {
    return await ParticipantesReservas.create(data);
  } catch (error) {
    throw new Error('Erro ao adicionar participante à reserva: ' + error.message);
  }
};

const updateParticipante = async (id, data) => {
  try {
    return await ParticipantesReservas.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar participante da reserva: ' + error.message);
  }
};

const removeParticipante = async (id) => {
  try {
    return await ParticipantesReservas.delete(id);
  } catch (error) {
    throw new Error('Erro ao remover participante da reserva: ' + error.message);
  }
};

module.exports = {
  getAllParticipantes,
  getParticipantesByReservaId,
  getParticipanteById,
  addParticipante,
  updateParticipante,
  removeParticipante
};
