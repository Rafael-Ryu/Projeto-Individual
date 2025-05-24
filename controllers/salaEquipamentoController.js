const SalaEquipamento = require('../models/salaEquipamentoModel');

exports.createSalaEquipamento = async (req, res) => {
  try {
    const novaRelacao = await SalaEquipamento.create(req.body);
    res.status(201).json(novaRelacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSalaEquipamentos = async (req, res) => {
  try {
    const relacoes = await SalaEquipamento.getAll();
    res.status(200).json(relacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaEquipamentoById = async (req, res) => {
  try {
    const relacao = await SalaEquipamento.getById(req.params.id);
    if (!relacao) {
      return res.status(404).json({ message: 'Relação sala-equipamento não encontrada' });
    }
    res.status(200).json(relacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaEquipamentosBySalaId = async (req, res) => {
  try {
    const relacoes = await SalaEquipamento.getBySalaId(req.params.salaId);
    res.status(200).json(relacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSalaEquipamentosByEquipamentoId = async (req, res) => {
  try {
    const relacoes = await SalaEquipamento.getByEquipamentoId(req.params.equipamentoId);
    res.status(200).json(relacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSalaEquipamento = async (req, res) => {
  try {
    const relacaoAtualizada = await SalaEquipamento.update(req.params.id, req.body);
    if (!relacaoAtualizada) {
      return res.status(404).json({ message: 'Relação sala-equipamento não encontrada' });
    }
    res.status(200).json(relacaoAtualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSalaEquipamento = async (req, res) => {
  try {
    const deletado = await SalaEquipamento.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Relação sala-equipamento não encontrada' });
    }
    res.status(200).json({ message: 'Relação sala-equipamento excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSalaEquipamentoBySalaAndEquipamento = async (req, res) => {
  try {
    const { salaId, equipamentoId } = req.params;
    const deletado = await SalaEquipamento.deleteBySalaAndEquipamento(salaId, equipamentoId);
    if (!deletado) {
      return res.status(404).json({ message: 'Relação sala-equipamento não encontrada' });
    }
    res.status(200).json({ message: 'Relação sala-equipamento excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
