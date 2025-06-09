// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireGuest } = require('../middleware/auth');

// Rota de login (POST)
router.post('/login', requireGuest, authController.login);

// Rota de logout (POST)
router.post('/logout', authController.logout);

// Rota para verificar autenticação (GET)
router.get('/check', authController.checkAuth);

// Rota de registro (POST) - opcional
router.post('/register', requireGuest, authController.register);

// Rotas para reset de senha
router.post('/forgot-password', requireGuest, authController.forgotPassword);
router.post('/verify-reset-code', requireGuest, authController.verifyResetCode);
router.post('/reset-password', requireGuest, authController.resetPassword);

module.exports = router;
