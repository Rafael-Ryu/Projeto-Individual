const Departamento = require('../models/departamentoModel');

const getAllDepartamentos = async () => {
  try {
    return await Departamento.getAll();
  } catch (error) {
    throw new Error('Erro ao obter departamentos: ' + error.message);
  }
};

const getDepartamentoById = async (id) => {
  try {
    return await Departamento.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter departamento: ' + error.message);
  }
};

const createDepartamento = async (data) => {
  try {
    return await Departamento.create(data);
  } catch (error) {
    throw new Error('Erro ao criar departamento: ' + error.message);
  }
};

const updateDepartamento = async (id, data) => {
  try {
    return await Departamento.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar departamento: ' + error.message);
  }
};

const deleteDepartamento = async (id) => {
  try {
    return await Departamento.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar departamento: ' + error.message);
  }
};

module.exports = {
  getAllDepartamentos,
  getDepartamentoById,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento
};
