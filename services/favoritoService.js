const Favorito = require('../models/favoritoModel');

const getAllFavoritos = async () => {
  try {
    return await Favorito.getAll();
  } catch (error) {
    throw new Error('Erro ao obter favoritos: ' + error.message);
  }
};

const getFavoritoById = async (id) => {
  try {
    return await Favorito.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter favorito: ' + error.message);
  }
};

const createFavorito = async (data) => {
  try {
    return await Favorito.create(data);
  } catch (error) {
    throw new Error('Erro ao criar favorito: ' + error.message);
  }
};

const deleteFavorito = async (id) => {
  try {
    return await Favorito.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar favorito: ' + error.message);
  }
};

module.exports = {
  getAllFavoritos,
  getFavoritoById,
  createFavorito,
  deleteFavorito
};
