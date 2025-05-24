// services/cargoService.js
const Cargo = require('../models/cargoModel');

const getAllCargos = async () => {
  try {
    return await Cargo.getAll();
  } catch (error) {
    throw new Error('Erro ao obter cargos: ' + error.message);
  }
};

const getCargoById = async (id) => {
  try {
    return await Cargo.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter cargo: ' + error.message);
  }
};

const createCargo = async (data) => {
  try {
    return await Cargo.create(data);
  } catch (error) {
    throw new Error('Erro ao criar cargo: ' + error.message);
  }
};

const updateCargo = async (id, data) => {
  try {
    return await Cargo.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar cargo: ' + error.message);
  }
};

const deleteCargo = async (id) => {
  try {
    return await Cargo.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar cargo: ' + error.message);
  }
};

module.exports = {
  getAllCargos,
  getCargoById,
  createCargo,
  updateCargo,
  deleteCargo
};
