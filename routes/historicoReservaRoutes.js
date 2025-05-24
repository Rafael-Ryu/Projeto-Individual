const express = require('express');
const router = express.Router();
const historicoReservaController = require('../controllers/historicoReservaController');

router.get('/', historicoReservaController.getAllHistoricoReservas);
router.get('/:id', historicoReservaController.getHistoricoReservaById);
router.get('/reserva/:reservaId', historicoReservaController.getHistoricoByReservaId);
router.post('/', historicoReservaController.createHistoricoReserva);
router.put('/:id', historicoReservaController.updateHistoricoReserva);
router.delete('/:id', historicoReservaController.deleteHistoricoReserva);

module.exports = router;
