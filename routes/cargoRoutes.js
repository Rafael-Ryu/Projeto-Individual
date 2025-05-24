const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');

router.get('/', cargoController.getAllCargos);
router.get('/:id', cargoController.getCargoById);
router.post('/', cargoController.createCargo);
router.put('/:id', cargoController.updateCargo);
router.delete('/:id', cargoController.deleteCargo);

module.exports = router;
