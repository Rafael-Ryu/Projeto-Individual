const Favorito = require('../models/favoritoModel');

exports.createFavorito = async (req, res) => {
  try {
    const novoFavorito = await Favorito.create(req.body);
    res.status(201).json(novoFavorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.getAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavoritosByUsuarioId = async (req, res) => {
  try {
    const favoritos = await Favorito.getByUsuarioId(req.params.usuarioId);
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavoritoById = async (req, res) => {
  try {
    const favorito = await Favorito.getById(req.params.id);
    if (!favorito) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }
    res.status(200).json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFavorito = async (req, res) => {
  try {
    const deletado = await Favorito.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Favorito não encontrado' });
    }
    res.status(200).json({ message: 'Favorito excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFavoritoByUsuarioAndSala = async (req, res) => {
  try {
    const { usuarioId, salaId } = req.params;
    const deletado = await Favorito.deleteByUsuarioAndSala(usuarioId, salaId);
    if (!deletado) {
      return res.status(404).json({ message: 'Favorito não encontrado para este usuário e sala' });
    }
    res.status(200).json({ message: 'Favorito excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
