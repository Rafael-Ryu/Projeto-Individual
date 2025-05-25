const SalaEquipamento = require('../models/salaEquipamentoModel');

const getAllSalaEquipamentos = async () => {
  try {
    return await SalaEquipamento.getAll();
  } catch (error) {
    throw new Error('Erro ao obter relações sala-equipamento: ' + error.message);
  }
};

const getSalaEquipamentoById = async (id) => {
  try {
    return await SalaEquipamento.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter relação sala-equipamento: ' + error.message);
  }
};

const getEquipamentosBySalaId = async (salaId) => {
  try {
    return await SalaEquipamento.getBySalaId(salaId);
  } catch (error) {
    throw new Error('Erro ao obter equipamentos da sala: ' + error.message);
  }
};

const getSalasByEquipamentoId = async (equipamentoId) => {
  try {
    return await SalaEquipamento.getByEquipamentoId(equipamentoId);
  } catch (error) {
    throw new Error('Erro ao obter salas com o equipamento: ' + error.message);
  }
};

const addEquipamentoToSala = async (data) => {
  try {
    return await SalaEquipamento.create(data);
  } catch (error) {
    throw new Error('Erro ao adicionar equipamento à sala: ' + error.message);
  }
};

const updateSalaEquipamento = async (id, data) => {
  try {
    return await SalaEquipamento.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar relação sala-equipamento: ' + error.message);
  }
};

const removeEquipamentoFromSala = async (id) => {
  try {
    return await SalaEquipamento.delete(id);
  } catch (error) {
    throw new Error('Erro ao remover equipamento da sala: ' + error.message);
  }
};

module.exports = {
  getAllSalaEquipamentos,
  getSalaEquipamentoById,
  getEquipamentosBySalaId,
  getSalasByEquipamentoId,
  addEquipamentoToSala,
  updateSalaEquipamento,
  removeEquipamentoFromSala
};
