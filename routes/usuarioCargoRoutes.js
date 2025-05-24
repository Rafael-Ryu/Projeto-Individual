const express = require('express');
const router = express.Router();
const usuarioCargoController = require('../controllers/usuarioCargoController');


router.post('/', usuarioCargoController.createUsuarioCargo);
router.get('/', usuarioCargoController.getAllUsuarioCargos);
router.get('/:id', usuarioCargoController.getUsuarioCargoById);
router.get('/usuario/:usuarioId', usuarioCargoController.getUsuarioCargosByUsuarioId);
router.get('/cargo/:cargoId', usuarioCargoController.getUsuarioCargosByCargoId);
router.put('/:id', usuarioCargoController.updateUsuarioCargo);
router.delete('/:id', usuarioCargoController.deleteUsuarioCargo);
router.delete('/usuario/:usuarioId/cargo/:cargoId', usuarioCargoController.deleteUsuarioCargoByUsuarioAndCargo);


module.exports = router;
