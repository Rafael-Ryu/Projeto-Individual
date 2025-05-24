const Edificio = require('../models/edificioModel');

exports.createEdificio = async (req, res) => {
    try {
        const novoEdificio = await Edificio.create(req.body);
        res.status(201).json(novoEdificio);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar edifício', error: error.message });
    }
};

exports.getAllEdificios = async (req, res) => {
    try {
        const edificios = await Edificio.findAll();
        res.status(200).json(edificios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar edifícios', error: error.message });
    }
};

exports.getEdificioById = async (req, res) => {
    try {
        const edificio = await Edificio.findById(req.params.id);
        if (!edificio) {
            return res.status(404).json({ message: 'Edifício não encontrado' });
        }
        res.status(200).json(edificio);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar edifício', error: error.message });
    }
};

exports.updateEdificio = async (req, res) => {
    try {
        const edificio = await Edificio.update(req.params.id, req.body);
        if (!edificio) {
            return res.status(404).json({ message: 'Edifício não encontrado para atualização' });
        }
        res.status(200).json(edificio);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar edifício', error: error.message });
    }
};

exports.deleteEdificio = async (req, res) => {
    try {
        const deletado = await Edificio.delete(req.params.id);
        if (!deletado) {
            return res.status(404).json({ message: 'Edifício não encontrado para exclusão' });
        }
        res.status(200).json({ message: 'Edifício excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir edifício', error: error.message });
    }
};