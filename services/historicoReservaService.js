const HistoricoReserva = require('../models/historicoReservaModel');

const getAllHistoricosReserva = async () => {
  try {
    return await HistoricoReserva.getAll();
  } catch (error) {
    throw new Error('Erro ao obter históricos de reserva: ' + error.message);
  }
};

const getHistoricoReservaById = async (id) => {
  try {
    return await HistoricoReserva.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter histórico de reserva: ' + error.message);
  }
};

const getHistoricosByReservaId = async (reservaId) => {
  try {
    return await HistoricoReserva.getByReservaId(reservaId);
  } catch (error) {
    throw new Error('Erro ao obter históricos para a reserva: ' + error.message);
  }
};

module.exports = {
  getAllHistoricosReserva,
  getHistoricoReservaById,
  getHistoricosByReservaId
};
