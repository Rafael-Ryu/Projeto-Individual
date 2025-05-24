// services/userService.js

// const db = require('../config/db'); // Removido, pois o Model lida com o DB
const User = require('../models/userModel'); // Importa o Model

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    // return await db.query('SELECT * FROM users'); // Alterado para usar o Model
    return await User.getAll();
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    // return await db.query('SELECT * FROM users WHERE id = $1', [id]); // Alterado para usar o Model
    return await User.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (userData) => { // Alterado para receber um objeto userData
  try {
    // const result = await db.query(
    //   'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    //   [name, email]
    // );
    // return result.rows[0];
    return await User.create(userData); // Passa o objeto userData para o Model
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, userData) => { // Alterado para receber um objeto userData
  try {
    // const result = await db.query(
    //   'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    //   [name, email, id]
    // );
    // return result.rows[0];
    return await User.update(id, userData); // Passa o objeto userData para o Model
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id) => {
  try {
    // const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    // return result.rows[0];
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
