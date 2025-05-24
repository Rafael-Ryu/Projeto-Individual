const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');

router.post('/', equipamentoController.createEquipamento);
router.get('/', equipamentoController.getAllEquipamentos);
router.get('/:id', equipamentoController.getEquipamentoById);
router.put('/:id', equipamentoController.updateEquipamento);
router.delete('/:id', equipamentoController.deleteEquipamento);

module.exports = router;
