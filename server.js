require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    app.use(express.json());

    const userRoutes = require('./routes/userRoutes');
    app.use('/users', userRoutes);

    const cargoRoutes = require('./routes/cargoRoutes');
    app.use('/cargos', cargoRoutes);

    const departamentoRoutes = require('./routes/departamentoRoutes');
    app.use('/api/departamentos', departamentoRoutes);

    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    const salaRoutes = require('./routes/salaRoutes');
    app.use('/api/salas', salaRoutes);

    const equipamentoRoutes = require('./routes/equipamentoRoutes');
    app.use('/api/equipamentos', equipamentoRoutes);

    const edificioRoutes = require('./routes/edificioRoutes');
    app.use('/api/edificios', edificioRoutes);

    const salaEquipamentoRoutes = require('./routes/salaEquipamentoRoutes');
    app.use('/api/sala-equipamentos', salaEquipamentoRoutes);

    const imagemSalaRoutes = require('./routes/imagemSalaRoutes');
    app.use('/api/imagens-sala', imagemSalaRoutes);

    const reservaRoutes = require('./routes/reservaRoutes');
    app.use('/api/reservas', reservaRoutes);

    const usuarioCargoRoutes = require('./routes/usuarioCargoRoutes');
    app.use('/api/usuario-cargos', usuarioCargoRoutes);

    const participantesReservasRoutes = require('./routes/participantesReservasRoutes');
    app.use('/api/participantes-reservas', participantesReservasRoutes);

    const historicoReservaRoutes = require('./routes/historicoReservaRoutes');
    app.use('/api/historico-reservas', historicoReservaRoutes);

    const notificacoesRoutes = require('./routes/notificacoesRoutes');
    app.use('/api/notificacoes', notificacoesRoutes);

    const favoritoRoutes = require('./routes/favoritoRoutes');
    app.use('/api/favoritos', favoritoRoutes);

    const reviewRoutes = require('./routes/reviewRoutes');
    app.use('/api/reviews', reviewRoutes);

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
  });
