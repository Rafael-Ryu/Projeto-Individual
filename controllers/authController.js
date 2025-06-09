// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// Login do usuário
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email e senha são obrigatórios' 
      });
    }

    // Buscar usuário por email
    const user = await User.getByEmail(email);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas' 
      });
    }

    // Verificar se o usuário está ativo
    if (!user.esta_ativo) {
      return res.status(401).json({ 
        success: false, 
        message: 'Conta desativada. Entre em contato com o administrador.' 
      });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciais inválidas' 
      });
    }

    // Criar sessão
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userName = user.nome;

    // Atualizar último login
    await User.updateLastLogin(user.id);

    // Remover senha do objeto de resposta
    const { password_hash, ...userWithoutPassword } = user;

    res.json({ 
      success: true, 
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      redirectUrl: '/dashboard'
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Logout do usuário
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro ao fazer logout' 
      });
    }
    
    res.clearCookie('connect.sid'); // Nome padrão do cookie de sessão
    res.json({ 
      success: true, 
      message: 'Logout realizado com sucesso',
      redirectUrl: '/login'
    });
  });
};

// Verificar se o usuário está autenticado
const checkAuth = async (req, res) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ 
        success: false, 
        authenticated: false 
      });
    }

    const user = await User.getById(req.session.userId);
    
    if (!user || !user.esta_ativo) {
      req.session.destroy();
      return res.status(401).json({ 
        success: false, 
        authenticated: false 
      });
    }

    const { password_hash, ...userWithoutPassword } = user;

    res.json({ 
      success: true, 
      authenticated: true,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Registrar novo usuário (se necessário)
const register = async (req, res) => {
  try {
    const { nome, email, password, telefone, departamento } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Verificar se o email já existe
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email já está em uso' 
      });
    }

    // Hash da senha
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const userData = {
      nome,
      email,
      password_hash,
      telefone,
      departamento,
      esta_ativo: true
    };

    const newUser = await User.create(userData);
    
    // Remover senha do objeto de resposta
    const { password_hash: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ 
      success: true, 
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
};

// Esqueceu a senha - enviar código
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email é obrigatório'
      });
    }

    // Verificar se o usuário existe
    const user = await User.getByEmail(email);
    if (!user) {
      // Por segurança, não revelar se o email existe ou não
      return res.json({
        success: true,
        message: 'Se o email existir, um código será enviado'
      });
    }

    // Gerar código de 6 dígitos
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Salvar código no banco (válido por 15 minutos)
    await User.saveResetCode(user.id, resetCode);

    // TODO: Enviar email com o código
    // Por enquanto, vamos simular o envio
    console.log(`Código de reset para ${email}: ${resetCode}`);

    res.json({
      success: true,
      message: 'Código enviado com sucesso',
      // Em produção, remover esta linha
      code: resetCode // Apenas para desenvolvimento
    });

  } catch (error) {
    console.error('Erro ao enviar código de reset:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Verificar código de reset
const verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email e código são obrigatórios'
      });
    }

    // Verificar se o usuário existe
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar código
    const isValidCode = await User.verifyResetCode(user.id, code);
    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: 'Código inválido ou expirado'
      });
    }

    res.json({
      success: true,
      message: 'Código verificado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao verificar código:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Redefinir senha
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, código e nova senha são obrigatórios'
      });
    }

    // Verificar se o usuário existe
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar código novamente
    const isValidCode = await User.verifyResetCode(user.id, code);
    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: 'Código inválido ou expirado'
      });
    }

    // Hash da nova senha
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(newPassword, saltRounds);

    // Atualizar senha
    await User.updatePassword(user.id, password_hash);

    // Limpar código de reset
    await User.clearResetCode(user.id);

    res.json({
      success: true,
      message: 'Senha redefinida com sucesso'
    });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  login,
  logout,
  checkAuth,
  register,
  forgotPassword,
  verifyResetCode,
  resetPassword
};
