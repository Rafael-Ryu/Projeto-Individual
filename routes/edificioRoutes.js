const express = require('express');
const router = express.Router();
const edificioController = require('../controllers/edificioController');

router.post('/', edificioController.createEdificio);
router.get('/', edificioController.getAllEdificios);
router.get('/:id', edificioController.getEdificioById);
router.put('/:id', edificioController.updateEdificio);
router.delete('/:id', edificioController.deleteEdificio);

module.exports = router;