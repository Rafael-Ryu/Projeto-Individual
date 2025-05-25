const Review = require('../models/reviewModel');

const getAllReviews = async () => {
  try {
    return await Review.getAll();
  } catch (error) {
    throw new Error('Erro ao obter reviews: ' + error.message);
  }
};

const getReviewById = async (id) => {
  try {
    return await Review.getById(id);
  } catch (error) {
    throw new Error('Erro ao obter review: ' + error.message);
  }
};

const getReviewsBySalaId = async (salaId) => {
  try {
    return await Review.getBySalaId(salaId);
  } catch (error) {
    throw new Error('Erro ao obter reviews da sala: ' + error.message);
  }
};

const getReviewsByUsuarioId = async (usuarioId) => {
  try {
    return await Review.getByUsuarioId(usuarioId);
  } catch (error) {
    throw new Error('Erro ao obter reviews do usuário: ' + error.message);
  }
};

const createReview = async (data) => {
  try {
    return await Review.create(data);
  } catch (error) {
    throw new Error('Erro ao criar review: ' + error.message);
  }
};

const updateReview = async (id, data) => {
  try {
    return await Review.update(id, data);
  } catch (error) {
    throw new Error('Erro ao atualizar review: ' + error.message);
  }
};

const deleteReview = async (id) => {
  try {
    return await Review.delete(id);
  } catch (error) {
    throw new Error('Erro ao deletar review: ' + error.message);
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsBySalaId,
  getReviewsByUsuarioId,
  createReview,
  updateReview,
  deleteReview
};
