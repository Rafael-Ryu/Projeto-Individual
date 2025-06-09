// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota para obter todos os dados do dashboard
router.get('/data', dashboardController.getDashboardData);

// Rota para obter apenas estatísticas
router.get('/stats', dashboardController.getStats);

// Rota para obter próximas reservas
router.get('/proximas-reservas', dashboardController.getProximasReservas);

// Rota para obter salas populares
router.get('/salas-populares', dashboardController.getSalasPopulares);

module.exports = router;
