const express = require('express');
const router = express.Router();
const salaEquipamentoController = require('../controllers/salaEquipamentoController');


router.post('/', salaEquipamentoController.createSalaEquipamento);
router.get('/', salaEquipamentoController.getAllSalaEquipamentos);
router.get('/:id', salaEquipamentoController.getSalaEquipamentoById);
router.get('/sala/:salaId', salaEquipamentoController.getSalaEquipamentosBySalaId);
router.get('/equipamento/:equipamentoId', salaEquipamentoController.getSalaEquipamentosByEquipamentoId);
router.put('/:id', salaEquipamentoController.updateSalaEquipamento);
router.delete('/:id', salaEquipamentoController.deleteSalaEquipamento);
router.delete('/sala/:salaId/equipamento/:equipamentoId', salaEquipamentoController.deleteSalaEquipamentoBySalaAndEquipamento);


module.exports = router;
