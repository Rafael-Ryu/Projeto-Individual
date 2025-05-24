const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const novaReview = await Review.create(req.body);
    res.status(201).json(novaReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.getById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsBySalaId = async (req, res) => {
  try {
    const reviews = await Review.getBySalaId(req.params.sala_id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByUsuarioId = async (req, res) => {
  try {
    const reviews = await Review.getByUsuarioId(req.params.usuario_id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewAtualizada = await Review.update(req.params.id, req.body);
    if (!reviewAtualizada) {
      return res.status(404).json({ message: 'Review não encontrada' });
    }
    res.status(200).json(reviewAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletado = await Review.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Review não encontrada' });
    }
    res.status(200).json({ message: 'Review excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
