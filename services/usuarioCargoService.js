const UsuarioCargo = require('../models/usuarioCargoModel');

const getAllUsuarioCargos = async () => {
  try {
    return await UsuarioCargo.getAll();
  } catch (error) {
    throw new Error('Erro ao obter todas as atribuições de cargos: ' + error.message);
  }
};

const getUsuarioCargoById = async (id) => {
  try {
    return await UsuarioCargo.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter atribuição de cargo: ' + error.message);
  }
};

const getCargosByUsuarioId = async (usuarioId) => {
  try {
    return await UsuarioCargo.getByUsuarioId(usuarioId);
  } catch (error) {
    throw new Error('Erro ao obter cargos do usuário: ' + error.message);
  }
};

const getUsuariosByCargoId = async (cargoId) => {
  try {
    return await UsuarioCargo.getByCargoId(cargoId);
  } catch (error) {
    throw new Error('Erro ao obter usuários com o cargo: ' + error.message);
  }
};

const assignCargoToUsuario = async (data) => {
  try {
    return await UsuarioCargo.create(data);
  } catch (error) {
    throw new Error('Erro ao atribuir cargo ao usuário: ' + error.message);
  }
};

const updateUsuarioCargo = async (id, data) => {
  try {
    return await UsuarioCargo.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar atribuição de cargo: ' + error.message);
  }
};

const removeCargoFromUsuario = async (id) => {
  try {
    return await UsuarioCargo.delete(id);
  } catch (error) {
    throw new Error('Erro ao remover cargo do usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsuarioCargos,
  getUsuarioCargoById,
  getCargosByUsuarioId,
  getUsuariosByCargoId,
  assignCargoToUsuario,
  updateUsuarioCargo,
  removeCargoFromUsuario
};
