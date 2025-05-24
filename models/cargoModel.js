const db = require('../config/db');

class Cargo {
  static async getAll() {
    const result = await db.query('SELECT * FROM cargos');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM cargos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nome, descricao, nivel_permissao } = data;
    const result = await db.query(
      'INSERT INTO cargos (nome, descricao, nivel_permissao) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, nivel_permissao]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nome, descricao, nivel_permissao } = data;
    const result = await db.query(
      'UPDATE cargos SET nome = $1, descricao = $2, nivel_permissao = $3 WHERE id = $4 RETURNING *',
      [nome, descricao, nivel_permissao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM cargos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Cargo;
