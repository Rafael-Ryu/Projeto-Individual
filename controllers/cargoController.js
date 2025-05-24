const cargoService = require('../services/cargoService');

const getAllCargos = async (req, res) => {
  try {
    const cargos = await cargoService.getAllCargos();
    res.status(200).json(cargos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCargoById = async (req, res) => {
  try {
    const cargo = await cargoService.getCargoById(req.params.id);
    if (cargo) {
      res.status(200).json(cargo);
    } else {
      res.status(404).json({ error: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCargo = async (req, res) => {
  try {
    const newCargo = await cargoService.createCargo(req.body);
    res.status(201).json(newCargo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCargo = async (req, res) => {
  try {
    const updatedCargo = await cargoService.updateCargo(req.params.id, req.body);
    if (updatedCargo) {
      res.status(200).json(updatedCargo);
    } else {
      res.status(404).json({ error: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCargo = async (req, res) => {
  try {
    const deletedCargo = await cargoService.deleteCargo(req.params.id);
    if (deletedCargo) {
      res.status(200).json(deletedCargo);
    } else {
      res.status(404).json({ error: 'Cargo não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCargos,
  getCargoById,
  createCargo,
  updateCargo,
  deleteCargo
};
