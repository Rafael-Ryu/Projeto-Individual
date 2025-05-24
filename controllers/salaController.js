const Sala = require('../models/salaModel');

exports.createSala = async (req, res) => {
  try {
    const novaSala = await Sala.create(req.body);
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSalas = async (req, res) => {
  try {
    const salas = await Sala.getAll();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaById = async (req, res) => {
  try {
    const sala = await Sala.getById(req.params.id);
    if (!sala) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(sala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSala = async (req, res) => {
  try {
    const salaAtualizada = await Sala.update(req.params.id, req.body);
    if (!salaAtualizada) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(salaAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSala = async (req, res) => {
  try {
    const deletado = await Sala.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
