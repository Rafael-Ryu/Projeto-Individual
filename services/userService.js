const User = require('../models/userModel');

const getAllUsers = async () => {
  try {
    return await User.getAll();
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await User.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    return await User.update(id, userData);
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    return await User.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
