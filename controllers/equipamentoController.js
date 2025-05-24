const Equipamento = require('../models/equipamentoModel');

exports.createEquipamento = async (req, res) => {
  try {
    const novoEquipamento = await Equipamento.create(req.body);
    res.status(201).json(novoEquipamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEquipamentos = async (req, res) => {
  try {
    const equipamentos = await Equipamento.getAll();
    res.status(200).json(equipamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEquipamentoById = async (req, res) => {
  try {
    const equipamento = await Equipamento.getById(req.params.id);
    if (!equipamento) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.status(200).json(equipamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEquipamento = async (req, res) => {
  try {
    const equipamentoAtualizado = await Equipamento.update(req.params.id, req.body);
    if (!equipamentoAtualizado) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.status(200).json(equipamentoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEquipamento = async (req, res) => {
  try {
    const deletado = await Equipamento.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.status(200).json({ message: 'Equipamento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
