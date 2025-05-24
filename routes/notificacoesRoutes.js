const express = require('express');
const router = express.Router();
const notificacoesController = require('../controllers/notificacoesController');

router.get('/usuario/:usuarioId', notificacoesController.getNotificacoesByUserId);
router.post('/', notificacoesController.createNotificacao);
router.put('/:id/lida', notificacoesController.markNotificacaoAsRead);
router.put('/usuario/:usuarioId/lidas', notificacoesController.markAllNotificacoesAsReadByUserId);
router.delete('/:id', notificacoesController.deleteNotificacao);

module.exports = router;
