const UsuarioCargo = require('../models/usuarioCargoModel');

exports.createUsuarioCargo = async (req, res) => {
  try {
    const novaAssociacao = await UsuarioCargo.create(req.body);
    res.status(201).json(novaAssociacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsuarioCargos = async (req, res) => {
  try {
    const associacoes = await UsuarioCargo.getAll();
    res.status(200).json(associacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioCargoById = async (req, res) => {
  try {
    const associacao = await UsuarioCargo.getById(req.params.id);
    if (!associacao) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
    res.status(200).json(associacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioCargosByUsuarioId = async (req, res) => {
  try {
    const associacoes = await UsuarioCargo.getByUsuarioId(req.params.usuarioId);
    res.status(200).json(associacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioCargosByCargoId = async (req, res) => {
  try {
    const associacoes = await UsuarioCargo.getByCargoId(req.params.cargoId);
    res.status(200).json(associacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsuarioCargo = async (req, res) => {
  try {
    const associacaoAtualizada = await UsuarioCargo.update(req.params.id, req.body);
    if (!associacaoAtualizada) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
    res.status(200).json(associacaoAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsuarioCargo = async (req, res) => {
  try {
    const deletado = await UsuarioCargo.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
    res.status(200).json({ message: 'Associação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsuarioCargoByUsuarioAndCargo = async (req, res) => {
  try {
    const { usuarioId, cargoId } = req.params;
    const deletado = await UsuarioCargo.deleteByUsuarioAndCargo(usuarioId, cargoId);
    if (!deletado) {
      return res.status(404).json({ message: 'Associação não encontrada' });
    }
    res.status(200).json({ message: 'Associação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
