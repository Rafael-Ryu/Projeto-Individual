const db = require('../config/db');

class Notificacao {
  static async getAll() {
    const result = await db.query('SELECT * FROM notificacoes');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM notificacoes WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByUserId(usuarioId) {
    const result = await db.query('SELECT * FROM notificacoes WHERE usuario_id = $1 ORDER BY criado_em DESC', [usuarioId]);
    return result.rows;
  }

  static async create(data) {
    const { usuario_id, tipo, titulo, message } = data;
    const result = await db.query(
      'INSERT INTO notificacoes (usuario_id, tipo, titulo, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, tipo, titulo, message]
    );
    return result.rows[0];
  }

  static async markAsRead(id) {
    const result = await db.query(
      'UPDATE notificacoes SET is_read = TRUE, read_em = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async markAllAsReadByUserId(usuarioId) {
    const result = await db.query(
      'UPDATE notificacoes SET is_read = TRUE, read_em = CURRENT_TIMESTAMP WHERE usuario_id = $1 AND is_read = FALSE RETURNING *',
      [usuarioId]
    );
    return result.rows;
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM notificacoes WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Notificacao;
