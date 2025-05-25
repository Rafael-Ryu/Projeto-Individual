const ImagemSala = require('../models/imagemSalaModel');

const getAllImagensSala = async () => {
  try {
    return await ImagemSala.getAll();
  } catch (error) {
    throw new Error('Erro ao obter imagens de sala: ' + error.message);
  }
};

const getImagemSalaById = async (id) => {
  try {
    return await ImagemSala.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter imagem de sala: ' + error.message);
  }
};

const getImagensBySalaId = async (salaId) => {
  try {
    return await ImagemSala.getBySalaId(salaId);
  } catch (error) {
    throw new Error('Erro ao obter imagens para a sala: ' + error.message);
  }
};

const createImagemSala = async (data) => {
  try {
    return await ImagemSala.create(data);
  } catch (error) {
    throw new Error('Erro ao criar imagem de sala: ' + error.message);
  }
};

const updateImagemSala = async (id, data) => {
  try {
    return await ImagemSala.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar imagem de sala: ' + error.message);
  }
};

const deleteImagemSala = async (id) => {
  try {
    return await ImagemSala.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar imagem de sala: ' + error.message);
  }
};

module.exports = {
  getAllImagensSala,
  getImagemSalaById,
  getImagensBySalaId,
  createImagemSala,
  updateImagemSala,
  deleteImagemSala
};
