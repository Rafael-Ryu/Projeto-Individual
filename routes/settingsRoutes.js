// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();

// Simulação de armazenamento de configurações (em produção, usar banco de dados)
const userSettings = new Map();

// GET /api/users/settings - Obter configurações do usuário
router.get('/settings', (req, res) => {
  try {
    // Configurações padrão sem tema
    const defaultSettings = {
      emailNotifications: true,
      meetingReminders: true,
      cancellationNotifications: true,
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      defaultCalendarView: 'month',
      weekStartDay: '1',
      showWeekends: true
    };

    res.json({
      success: true,
      data: defaultSettings
    });
  } catch (error) {
    console.error('Erro ao obter configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT /api/users/settings - Salvar configurações do usuário
router.put('/settings', (req, res) => {
  try {
    const settings = req.body;
    
    // Validar configurações básicas
    const validSettings = {
      // Notificações
      emailNotifications: Boolean(settings.emailNotifications),
      meetingReminders: Boolean(settings.meetingReminders),
      cancellationNotifications: Boolean(settings.cancellationNotifications),

      // Exibição
      language: ['pt-BR', 'en-US', 'es-ES'].includes(settings.language) ? settings.language : 'pt-BR',
      timezone: settings.timezone || 'America/Sao_Paulo',

      // Calendário
      defaultCalendarView: ['month', 'week', 'day'].includes(settings.defaultCalendarView) ? settings.defaultCalendarView : 'month',
      weekStartDay: ['0', '1'].includes(settings.weekStartDay) ? settings.weekStartDay : '1',
      showWeekends: Boolean(settings.showWeekends)
    };
    
    // Salvar configurações (simulado)
    console.log('Configurações salvas:', validSettings);
    
    res.json({
      success: true,
      message: 'Configurações salvas com sucesso',
      data: validSettings
    });
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/users/settings - Resetar configurações para padrão
router.delete('/settings', (req, res) => {
  try {
    // Resetar configurações (simulado)
    console.log('Configurações resetadas');
    
    res.json({
      success: true,
      message: 'Configurações resetadas para padrão'
    });
  } catch (error) {
    console.error('Erro ao resetar configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
