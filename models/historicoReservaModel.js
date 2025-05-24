// models/historicoReservaModel.js
const db = require('../config/db');

class HistoricoReserva {
  static async getAll() {
    const result = await db.query('SELECT * FROM historico_reserva');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM historico_reserva WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { reserva_id, usuario_id, acao, status_anterior, status_novo } = data;
    const result = await db.query(
      'INSERT INTO historico_reserva (reserva_id, usuario_id, acao, status_anterior, status_novo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [reserva_id, usuario_id, acao, status_anterior, status_novo]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { reserva_id, usuario_id, acao, status_anterior, status_novo } = data;
    const result = await db.query(
      'UPDATE historico_reserva SET reserva_id = $1, usuario_id = $2, acao = $3, status_anterior = $4, status_novo = $5 WHERE id = $6 RETURNING *',
      [reserva_id, usuario_id, acao, status_anterior, status_novo, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM historico_reserva WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async getByReservaId(reservaId) {
    const result = await db.query('SELECT * FROM historico_reserva WHERE reserva_id = $1 ORDER BY criado_em DESC', [reservaId]);
    return result.rows;
  }
}

module.exports = HistoricoReserva;
