// models/salaEquipamentoModel.js
const db = require('../config/db');

class SalaEquipamento {
  static async getAll() {
    const result = await db.query('SELECT * FROM sala_equipamento');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM sala_equipamento WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getBySalaId(salaId) {
    const result = await db.query('SELECT * FROM sala_equipamento WHERE sala_id = $1', [salaId]);
    return result.rows;
  }

  static async getByEquipamentoId(equipamentoId) {
    const result = await db.query('SELECT * FROM sala_equipamento WHERE equipamento_id = $1', [equipamentoId]);
    return result.rows;
  }

  static async create(data) {
    const { sala_id, equipamento_id, quantidade, status, last_maintenance } = data;
    const result = await db.query(
      'INSERT INTO sala_equipamento (sala_id, equipamento_id, quantidade, status, last_maintenance) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [sala_id, equipamento_id, quantidade, status, last_maintenance]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { sala_id, equipamento_id, quantidade, status, last_maintenance } = data;
    const result = await db.query(
      'UPDATE sala_equipamento SET sala_id = $1, equipamento_id = $2, quantidade = $3, status = $4, last_maintenance = $5 WHERE id = $6 RETURNING *',
      [sala_id, equipamento_id, quantidade, status, last_maintenance, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM sala_equipamento WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async deleteBySalaAndEquipamento(salaId, equipamentoId) {
    const result = await db.query('DELETE FROM sala_equipamento WHERE sala_id = $1 AND equipamento_id = $2 RETURNING *', [salaId, equipamentoId]);
    return result.rowCount > 0;
  }
}

module.exports = SalaEquipamento;
