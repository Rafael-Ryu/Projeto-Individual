const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favoritoController');

router.post('/', favoritoController.createFavorito);
router.get('/', favoritoController.getAllFavoritos);
router.get('/usuario/:usuarioId', favoritoController.getFavoritosByUsuarioId);
router.get('/:id', favoritoController.getFavoritoById);
router.delete('/:id', favoritoController.deleteFavorito);
router.delete('/usuario/:usuarioId/sala/:salaId', favoritoController.deleteFavoritoByUsuarioAndSala);

module.exports = router;
