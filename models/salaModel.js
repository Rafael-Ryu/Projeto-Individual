// models/salaModel.js
const db = require('../config/db');

class Sala {
  static async getAll() {
    const result = await db.query('SELECT * FROM salas');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM salas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { nome, construcao_id, departamento_id, floor, capacidade, descricao, tipo_sala, esta_ativo } = data;

    // Garantir que esta_ativo tenha um valor padrão se não fornecido
    const estaAtivoValue = esta_ativo !== undefined && esta_ativo !== null ? esta_ativo : true;

    const result = await db.query(
      'INSERT INTO salas (nome, construcao_id, departamento_id, floor, capacidade, descricao, tipo_sala, esta_ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [nome, construcao_id, departamento_id, floor, capacidade, descricao, tipo_sala, estaAtivoValue]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { nome, construcao_id, departamento_id, floor, capacidade, descricao, tipo_sala, esta_ativo } = data;

    // Garantir que esta_ativo tenha um valor padrão se não fornecido
    const estaAtivoValue = esta_ativo !== undefined && esta_ativo !== null ? esta_ativo : true;

    const result = await db.query(
      'UPDATE salas SET nome = $1, construcao_id = $2, departamento_id = $3, floor = $4, capacidade = $5, descricao = $6, tipo_sala = $7, esta_ativo = $8 WHERE id = $9 RETURNING *',
      [nome, construcao_id, departamento_id, floor, capacidade, descricao, tipo_sala, estaAtivoValue, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM salas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Sala;
