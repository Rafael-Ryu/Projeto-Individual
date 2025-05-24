// routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.createReserva);
router.get('/', reservaController.getAllReservas);
router.get('/:id', reservaController.getReservaById);
router.get('/usuario/:usuarioId', reservaController.getReservasByUsuarioId);
router.put('/:id', reservaController.updateReserva);
router.patch('/:id/cancelar', reservaController.cancelReserva);
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
