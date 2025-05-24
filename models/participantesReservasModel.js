const db = require('../config/db');

class ParticipantesReservas {
  static async getAll() {
    const result = await db.query('SELECT * FROM participantes_reservas');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM participantes_reservas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByReservaId(reservaId) {
    const result = await db.query('SELECT * FROM participantes_reservas WHERE reserva_id = $1', [reservaId]);
    return result.rows;
  }

  static async create(data) {
    const { reserva_id, usuario_id, cargo, confirmado, convidado_em, confirmado_em } = data;
    const result = await db.query(
      'INSERT INTO participantes_reservas (reserva_id, usuario_id, cargo, confirmado, convidado_em, confirmado_em) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [reserva_id, usuario_id, cargo, confirmado, convidado_em, confirmado_em]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { reserva_id, usuario_id, cargo, confirmado, convidado_em, confirmado_em } = data;
    const result = await db.query(
      'UPDATE participantes_reservas SET reserva_id = $1, usuario_id = $2, cargo = $3, confirmado = $4, convidado_em = $5, confirmado_em = $6 WHERE id = $7 RETURNING *',
      [reserva_id, usuario_id, cargo, confirmado, convidado_em, confirmado_em, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM participantes_reservas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = ParticipantesReservas;
