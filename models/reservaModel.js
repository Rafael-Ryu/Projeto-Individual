// models/reservaModel.js
const db = require('../config/db');

class Reserva {
  static async getAll() {
    const result = await db.query(`
      SELECT r.*,
             COALESCE(r.status, 'confirmado') as status,
             s.nome as sala_nome,
             s.capacidade,
             e.nome as edificio_nome
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.id
      LEFT JOIN edificios e ON s.construcao_id = e.id
      ORDER BY r.tempo_inicio DESC
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM reservas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByUsuarioId(usuarioId) {
    const result = await db.query(`
      SELECT r.*,
             COALESCE(r.status, 'confirmado') as status,
             s.nome as sala_nome,
             s.capacidade,
             e.nome as edificio_nome
      FROM reservas r
      LEFT JOIN salas s ON r.sala_id = s.id
      LEFT JOIN edificios e ON s.construcao_id = e.id
      WHERE r.usuario_id = $1
      ORDER BY r.tempo_inicio DESC
    `, [usuarioId]);
    return result.rows;
  }

  static async create(data) {
    const { sala_id, usuario_id, tempo_inicio, tempo_fim, titulo, descricao, numero_participantes, e_recorrente, padrao_recorrencia } = data;
    const status = data.status || 'confirmado'; // Garantir status padrão
    const result = await db.query(
      'INSERT INTO reservas (sala_id, usuario_id, tempo_inicio, tempo_fim, titulo, descricao, status, numero_participantes, e_recorrente, padrao_recorrencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [sala_id, usuario_id, tempo_inicio, tempo_fim, titulo, descricao, status, numero_participantes, e_recorrente, padrao_recorrencia]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { sala_id, tempo_inicio, tempo_fim, titulo, descricao, status, numero_participantes, e_recorrente, padrao_recorrencia } = data;
    const result = await db.query(
      'UPDATE reservas SET sala_id = $1, tempo_inicio = $2, tempo_fim = $3, titulo = $4, descricao = $5, status = $6, numero_participantes = $7, e_recorrente = $8, padrao_recorrencia = $9, atualizado_em = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
      [sala_id, tempo_inicio, tempo_fim, titulo, descricao, status, numero_participantes, e_recorrente, padrao_recorrencia, id]
    );
    return result.rows[0];
  }

  static async cancel(id, usuario_id) {
    const result = await db.query(
      'UPDATE reservas SET status = $1, cancelado_em = CURRENT_TIMESTAMP, atualizado_em = CURRENT_TIMESTAMP WHERE id = $2 AND usuario_id = $3 RETURNING *',
      ['cancelado', id, usuario_id]
    );
    if (result.rows.length === 0) {
        const adminCancelResult = await db.query(
            'UPDATE reservas SET status = $1, cancelado_em = CURRENT_TIMESTAMP, atualizado_em = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            ['cancelado', id]
        );
        return adminCancelResult.rows[0];
    }
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Reserva;
