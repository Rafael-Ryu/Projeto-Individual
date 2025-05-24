const HistoricoReserva = require('../models/historicoReservaModel');

exports.getAllHistoricoReservas = async (req, res) => {
  try {
    const historicos = await HistoricoReserva.getAll();
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricoReservaById = async (req, res) => {
  try {
    const historico = await HistoricoReserva.getById(req.params.id);
    if (!historico) {
      return res.status(404).json({ message: 'Registro de histórico não encontrado' });
    }
    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHistoricoByReservaId = async (req, res) => {
  try {
    const historicos = await HistoricoReserva.getByReservaId(req.params.reservaId);
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createHistoricoReserva = async (req, res) => {
  try {
    const novoHistorico = await HistoricoReserva.create(req.body);
    res.status(201).json(novoHistorico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHistoricoReserva = async (req, res) => {
  try {
    const historicoAtualizado = await HistoricoReserva.update(req.params.id, req.body);
    if (!historicoAtualizado) {
      return res.status(404).json({ message: 'Registro de histórico não encontrado' });
    }
    res.status(200).json(historicoAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHistoricoReserva = async (req, res) => {
  try {
    const deletado = await HistoricoReserva.delete(req.params.id);
    if (!deletado) {
      return res.status(404).json({ message: 'Registro de histórico não encontrado' });
    }
    res.status(200).json({ message: 'Registro de histórico excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
