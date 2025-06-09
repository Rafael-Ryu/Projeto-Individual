const User = require('../models/userModel');

const checkFirstLogin = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return next();
    }

    const user = await User.getById(req.session.userId);
    if (!user) {
      return next();
    }

    if (user.email === 'admin@sistema.com') {
      const bcrypt = require('bcrypt');
      const isDefaultPassword = await bcrypt.compare('admin123', user.password_hash);
      
      if (isDefaultPassword && req.path !== '/alterar-senha-inicial') {
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
