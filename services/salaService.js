// services/salaService.js
const Sala = require('../models/salaModel');

const getAllSalas = async () => {
  try {
    return await Sala.getAll();
  } catch (error) {
    throw new Error('Erro ao obter salas: ' + error.message);
  }
};

const getSalaById = async (id) => {
  try {
    return await Sala.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter sala: ' + error.message);
  }
};

const createSala = async (data) => {
  try {
    return await Sala.create(data);
  } catch (error) {
    throw new Error('Erro ao criar sala: ' + error.message);
  }
};

const updateSala = async (id, data) => {
  try {
    return await Sala.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar sala: ' + error.message);
  }
};

const deleteSala = async (id) => {
  try {
    return await Sala.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar sala: ' + error.message);
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};
