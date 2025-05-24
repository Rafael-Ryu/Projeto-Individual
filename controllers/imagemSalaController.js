const ImagemSala = require('../models/imagemSalaModel');

exports.createImagemSala = async (req, res) => {
  try {
    const novaImagemSala = await ImagemSala.create(req.body);
    res.status(201).json(novaImagemSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllImagensSala = async (req, res) => {
  try {
    const imagensSala = await ImagemSala.getAll();
    res.status(200).json(imagensSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImagemSalaById = async (req, res) => {
  try {
    const imagemSala = await ImagemSala.getById(req.params.id);
    if (!imagemSala) {
      return res.status(404).json({ message: 'Imagem da sala não encontrada' });
    }
    res.status(200).json(imagemSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImagensBySalaId = async (req, res) => {
  try {
    const imagens = await ImagemSala.getBySalaId(req.params.sala_id);
    res.status(200).json(imagens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateImagemSala = async (req, res) => {
  try {
    const imagemSalaAtualizada = await ImagemSala.update(req.params.id, req.body);
    if (!imagemSalaAtualizada) {
      return res.status(404).json({ message: 'Imagem da sala não encontrada' });
    }
    res.status(200).json(imagemSalaAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteImagemSala = async (req, res) => {
  try {
    const deletado = await ImagemSala.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Imagem da sala não encontrada' });
    }
    res.status(200).json({ message: 'Imagem da sala excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
