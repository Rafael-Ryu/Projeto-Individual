const Reserva = require('../models/reservaModel');

const getAllReservas = async () => {
  try {
    return await Reserva.getAll();
  } catch (error) {
    throw new Error('Erro ao obter reservas: ' + error.message);
  }
};

const getReservaById = async (id) => {
  try {
    return await Reserva.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter reserva: ' + error.message);
  }
};

const getReservasBySalaId = async (salaId) => {
  try {
    return await Reserva.getBySalaId(salaId);
  } catch (error) {
    throw new Error('Erro ao obter reservas da sala: ' + error.message);
  }
};

const getReservasByUsuarioId = async (usuarioId) => {
  try {
    return await Reserva.getByUsuarioId(usuarioId);
  } catch (error) {
    throw new Error('Erro ao obter reservas do usuário: ' + error.message);
  }
};

const createReserva = async (data) => {
  try {
    return await Reserva.create(data);
  } catch (error) {
    throw new Error('Erro ao criar reserva: ' + error.message);
  }
};

const updateReserva = async (id, data) => {
  try {
    return await Reserva.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar reserva: ' + error.message);
  }
};

const cancelReserva = async (id) => {
  try {
    return await Reserva.update(id, { status: 'cancelado', cancelado_em: new Date() });
  } catch (error) {
    throw new Error('Erro ao cancelar reserva: ' + error.message);
  }
};

const deleteReserva = async (id) => {
  try {
    return await Reserva.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar reserva: ' + error.message);
  }
};

module.exports = {
  getAllReservas,
  getReservaById,
  getReservasBySalaId,
  getReservasByUsuarioId,
  createReserva,
  updateReserva,
  cancelReserva,
  deleteReserva
};
