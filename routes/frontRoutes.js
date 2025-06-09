const express = require('express');
const router = express.Router();
const path = require('path');
const { requireAuth, requireGuest, requireAdmin } = require('../middleware/auth');

// Redirect root to login
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Login page (only for guests)
router.get('/login', requireGuest, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Login - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/login')
  });
});

// Cadastro page (public)
router.get('/cadastro', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Cadastro - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/cadastro')
  });
});

// Esqueceu senha page (public)
router.get('/esqueceu-senha', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Esqueceu a Senha - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/esqueceu-senha')
  });
});

// Dashboard page (requires authentication)
router.get('/dashboard', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Dashboard - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/dashboard')
  });
});

// Minhas Reservas page (requires authentication)
router.get('/minhas-reservas', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Minhas Reservas - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/minhas-reservas')
  });
});

// Nova Reserva page (requires authentication)
router.get('/nova-reserva', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Nova Reserva - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/nova-reserva')
  });
});

// Buscar Salas page (requires authentication)
router.get('/buscar-salas', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Buscar Salas - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/buscar-salas')
  });
});

// Calendário page (requires authentication)
router.get('/calendario', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Calendário - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/calendario')
  });
});

// Favoritos page (requires authentication)
router.get('/favoritos', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Favoritos - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/favoritos')
  });
});

// Histórico page (requires authentication)
router.get('/historico', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Histórico - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/historico')
  });
});

// Relatórios page (requires authentication and admin)
router.get('/relatorios', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Relatórios - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/relatorios')
  });
});

// Ajuda page (requires authentication)
router.get('/ajuda', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Ajuda - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/ajuda')
  });
});

// Perfil page (requires authentication)
router.get('/perfil', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Meu Perfil - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/perfil')
  });
});

// Configurações page (requires authentication)
router.get('/configuracoes', requireAuth, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Configurações - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/configuracoes')
  });
});

// Admin routes (requires authentication and admin)
router.get('/admin/usuarios', requireAuth, requireAdmin, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Gerenciar Usuários - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/admin-usuarios')
  });
});

router.get('/admin/salas', requireAuth, requireAdmin, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Gerenciar Salas - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/admin-salas')
  });
});

router.get('/admin/equipamentos', requireAuth, requireAdmin, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Gerenciar Equipamentos - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/admin-equipamentos')
  });
});

router.get('/admin/edificios', requireAuth, requireAdmin, (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Gerenciar Edifícios - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/admin-edificios')
  });
});

// Legacy routes (keeping for compatibility)
router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Sobre - Sistema de Reservas',
    content: path.join(__dirname, '../views/pages/page2')
  });
});

module.exports = router;
