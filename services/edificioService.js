const Edificio = require('../models/edificioModel');

const getAllEdificios = async () => {
  try {
    return await Edificio.getAll();
  } catch (error) {
    throw new Error('Erro ao obter edifícios: ' + error.message);
  }
};

const getEdificioById = async (id) => {
  try {
    return await Edificio.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter edifício: ' + error.message);
  }
};

const createEdificio = async (data) => {
  try {
    return await Edificio.create(data);
  } catch (error) {
    throw new Error('Erro ao criar edifício: ' + error.message);
  }
};

const updateEdificio = async (id, data) => {
  try {
    return await Edificio.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar edifício: ' + error.message);
  }
};

const deleteEdificio = async (id) => {
  try {
    return await Edificio.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar edifício: ' + error.message);
  }
};

module.exports = {
  getAllEdificios,
  getEdificioById,
  createEdificio,
  updateEdificio,
  deleteEdificio
};
