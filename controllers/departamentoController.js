const Departamento = require('../models/departamentoModel');

exports.createDepartamento = async (req, res) => {
    try {
        const novoDepartamento = await Departamento.create(req.body);
        res.status(201).json(novoDepartamento);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar departamento', error: error.message });
    }
};

exports.getAllDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.status(200).json(departamentos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar departamentos', error: error.message });
    }
};

exports.getDepartamentoById = async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento não encontrado' });
        }
        res.status(200).json(departamento);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar departamento', error: error.message });
    }
};

exports.updateDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.update(req.params.id, req.body);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento não encontrado para atualização' });
        }
        res.status(200).json(departamento);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar departamento', error: error.message });
    }
};

exports.deleteDepartamento = async (req, res) => {
    try {
        const deletado = await Departamento.delete(req.params.id);
        if (!deletado) {
            return res.status(404).json({ message: 'Departamento não encontrado para exclusão' });
        }
        res.status(200).json({ message: 'Departamento excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir departamento', error: error.message });
    }
};