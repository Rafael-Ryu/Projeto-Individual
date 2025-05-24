const db = require('../config/db');

class Favorito {
  static async getAll() {
    const result = await db.query('SELECT * FROM favoritos');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM favoritos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByUsuarioId(usuarioId) {
    const result = await db.query('SELECT * FROM favoritos WHERE usuario_id = $1', [usuarioId]);
    return result.rows;
  }

  static async create(data) {
    const { usuario_id, sala_id } = data;
    const result = await db.query(
      'INSERT INTO favoritos (usuario_id, sala_id) VALUES ($1, $2) RETURNING *',
      [usuario_id, sala_id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM favoritos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async deleteByUsuarioAndSala(usuarioId, salaId) {
    const result = await db.query('DELETE FROM favoritos WHERE usuario_id = $1 AND sala_id = $2 RETURNING *', [usuarioId, salaId]);
    return result.rowCount > 0;
  }
}

module.exports = Favorito;
