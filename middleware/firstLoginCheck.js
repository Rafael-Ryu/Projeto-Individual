// middleware/firstLoginCheck.js
const User = require('../models/userModel');

/**
 * Middleware para verificar se é o primeiro login do usuário administrador
 * e forçar a alteração da senha padrão
 */
const checkFirstLogin = async (req, res, next) => {
  try {
    // Verificar se o usuário está logado
    if (!req.session.userId) {
      return next();
    }

    // Buscar dados do usuário
    const user = await User.getById(req.session.userId);
    if (!user) {
      return next();
    }

    // Verificar se é o admin com senha padrão
    if (user.email === 'admin@sistema.com') {
      // Verificar se a senha nunca foi alterada (usando ultimo_login como indicador)
      const bcrypt = require('bcrypt');
      const isDefaultPassword = await bcrypt.compare('admin123', user.password_hash);
      
      if (isDefaultPassword && req.path !== '/alterar-senha-inicial') {
        // Redirecionar para página de alteração de senha obrigatória
        return res.redirect('/alterar-senha-inicial');
      }
    }

    next();
  } catch (error) {
    console.error('Erro no middleware de verificação de primeiro login:', error);
    next();
  }
};

module.exports = { checkFirstLogin };
