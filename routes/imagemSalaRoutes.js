const express = require('express');
const router = express.Router();
const imagemSalaController = require('../controllers/imagemSalaController');

router.post('/', imagemSalaController.createImagemSala);
router.get('/', imagemSalaController.getAllImagensSala);
router.get('/:id', imagemSalaController.getImagemSalaById);
router.get('/sala/:sala_id', imagemSalaController.getImagensBySalaId);
router.put('/:id', imagemSalaController.updateImagemSala);
router.delete('/:id', imagemSalaController.deleteImagemSala);

module.exports = router;
