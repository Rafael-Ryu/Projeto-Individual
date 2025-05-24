const db = require('../config/db');

class Equipamento {
  static async getAll() {
    const result = await db.query('SELECT * FROM equipamento');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM equipamento WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nome, descricao, category } = data;
    const result = await db.query(
      'INSERT INTO equipamento (nome, descricao, category) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, category]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nome, descricao, category } = data;
    const result = await db.query(
      'UPDATE equipamento SET nome = $1, descricao = $2, category = $3 WHERE id = $4 RETURNING *',
      [nome, descricao, category, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM equipamento WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Equipamento;
