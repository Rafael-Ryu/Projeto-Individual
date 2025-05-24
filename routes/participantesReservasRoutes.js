const express = require('express');
const router = express.Router();
const participantesReservasController = require('../controllers/participantesReservasController');


router.post('/', participantesReservasController.createParticipanteReserva);
router.get('/', participantesReservasController.getAllParticipantesReservas);
router.get('/:id', participantesReservasController.getParticipanteReservaById);
router.get('/reserva/:reservaId', participantesReservasController.getParticipantesByReservaId);
router.put('/:id', participantesReservasController.updateParticipanteReserva);
router.delete('/:id', participantesReservasController.deleteParticipanteReserva);


module.exports = router;
