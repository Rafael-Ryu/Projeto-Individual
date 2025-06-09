require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'sistema-reservas-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

db.connect()
  .then((client) => {
    console.log('Conectado ao banco de dados PostgreSQL');
    client.release(); // Release the test connection

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));    // Middleware de autenticação
    const { addUserToLocals, requireAuth, requireAuthAPI, requireAdmin } = require('./middleware/auth');
    app.use(addUserToLocals);

    // Rotas de autenticação
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    // Rotas do dashboard
    const dashboardRoutes = require('./routes/dashboardRoutes');
    app.use('/api/dashboard', requireAuthAPI, dashboardRoutes);    const userRoutes = require('./routes/userRoutes');
    app.use('/users', requireAuthAPI, requireAdmin, userRoutes);

    // Rotas de configurações
    const settingsRoutes = require('./routes/settingsRoutes');
    app.use('/api/users', settingsRoutes);

    const cargoRoutes = require('./routes/cargoRoutes');
    app.use('/cargos', requireAuthAPI, requireAdmin, cargoRoutes);

    const departamentoRoutes = require('./routes/departamentoRoutes');
    app.use('/api/departamentos', requireAuthAPI, requireAdmin, departamentoRoutes);

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);    const salaRoutes = require('./routes/salaRoutes');
    app.use('/api/salas', requireAuthAPI, salaRoutes);

    const equipamentoRoutes = require('./routes/equipamentoRoutes');
    app.use('/api/equipamentos', requireAuthAPI, requireAdmin, equipamentoRoutes);

    const edificioRoutes = require('./routes/edificioRoutes');
    app.use('/api/edificios', requireAuthAPI, requireAdmin, edificioRoutes);

    const salaEquipamentoRoutes = require('./routes/salaEquipamentoRoutes');
    app.use('/api/sala-equipamentos', requireAuthAPI, requireAdmin, salaEquipamentoRoutes);

    const imagemSalaRoutes = require('./routes/imagemSalaRoutes');
    app.use('/api/imagens-sala', requireAuthAPI, imagemSalaRoutes);

    const reservaRoutes = require('./routes/reservaRoutes');
    app.use('/api/reservas', requireAuthAPI, reservaRoutes);    const usuarioCargoRoutes = require('./routes/usuarioCargoRoutes');
    app.use('/api/usuario-cargos', requireAuthAPI, requireAdmin, usuarioCargoRoutes);

    const participantesReservasRoutes = require('./routes/participantesReservasRoutes');
    app.use('/api/participantes-reservas', requireAuthAPI, participantesReservasRoutes);

    const historicoReservaRoutes = require('./routes/historicoReservaRoutes');
    app.use('/api/historico-reservas', requireAuthAPI, historicoReservaRoutes);

    const notificacoesRoutes = require('./routes/notificacoesRoutes');
    app.use('/api/notificacoes', requireAuthAPI, notificacoesRoutes);

    const favoritoRoutes = require('./routes/favoritoRoutes');
    app.use('/api/favoritos', requireAuthAPI, favoritoRoutes);

    const reviewRoutes = require('./routes/reviewRoutes');
    app.use('/api/reviews', requireAuthAPI, reviewRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).send('Página não encontrada');
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Erro no servidor');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    console.error('Verifique se o PostgreSQL está rodando e as credenciais estão corretas');
    process.exit(1);
  });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Graceful shutdown...');
  if (db.pool) {
    db.pool.end(() => {
      console.log('Database pool has ended.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Graceful shutdown...');
  if (db.pool) {
    db.pool.end(() => {
      console.log('Database pool has ended.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
