// models/usuarioCargoModel.js
const db = require('../config/db');

class UsuarioCargo {
  static async getAll() {
    const result = await db.query('SELECT * FROM usuario_cargos');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM usuario_cargos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByUsuarioId(usuarioId) {
    const result = await db.query('SELECT * FROM usuario_cargos WHERE usuario_id = $1', [usuarioId]);
    return result.rows;
  }

  static async getByCargoId(cargoId) {
    const result = await db.query('SELECT * FROM usuario_cargos WHERE cargo_id = $1', [cargoId]);
    return result.rows;
  }

  static async create(data) {
    const { usuario_id, cargo_id, expira_em } = data;
    const result = await db.query(
      'INSERT INTO usuario_cargos (usuario_id, cargo_id, expira_em) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, cargo_id, expira_em]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { usuario_id, cargo_id, expira_em } = data;
    const result = await db.query(
      'UPDATE usuario_cargos SET usuario_id = $1, cargo_id = $2, expira_em = $3 WHERE id = $4 RETURNING *',
      [usuario_id, cargo_id, expira_em, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM usuario_cargos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async deleteByUsuarioAndCargo(usuarioId, cargoId) {
    const result = await db.query('DELETE FROM usuario_cargos WHERE usuario_id = $1 AND cargo_id = $2 RETURNING *', [usuarioId, cargoId]);
    return result.rowCount > 0;
  }
}

module.exports = UsuarioCargo;
