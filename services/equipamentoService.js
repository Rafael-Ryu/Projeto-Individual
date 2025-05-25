const Equipamento = require('../models/equipamentoModel');

const getAllEquipamentos = async () => {
  try {
    return await Equipamento.getAll();
  } catch (error) {
    throw new Error('Erro ao obter equipamentos: ' + error.message);
  }
};

const getEquipamentoById = async (id) => {
  try {
    return await Equipamento.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter equipamento: ' + error.message);
  }
};

const createEquipamento = async (data) => {
  try {
    return await Equipamento.create(data);
  } catch (error) {
    throw new Error('Erro ao criar equipamento: ' + error.message);
  }
};

const updateEquipamento = async (id, data) => {
  try {
    return await Equipamento.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar equipamento: ' + error.message);
  }
};

const deleteEquipamento = async (id) => {
  try {
    return await Equipamento.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar equipamento: ' + error.message);
  }
};

module.exports = {
  getAllEquipamentos,
  getEquipamentoById,
  createEquipamento,
  updateEquipamento,
  deleteEquipamento
};
