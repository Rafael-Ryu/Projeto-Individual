// models/reviewModel.js
const db = require('../config/db');

class Review {
  static async getAll() {
    const result = await db.query('SELECT * FROM reviews');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM reviews WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getBySalaId(sala_id) {
    const result = await db.query('SELECT * FROM reviews WHERE sala_id = $1', [sala_id]);
    return result.rows;
  }

  static async getByUsuarioId(usuario_id) {
    const result = await db.query('SELECT * FROM reviews WHERE usuario_id = $1', [usuario_id]);
    return result.rows;
  }

  static async create(data) {
    const { usuario_id, sala_id, avaliacao, comentario } = data;
    const result = await db.query(
      'INSERT INTO reviews (usuario_id, sala_id, avaliacao, comentario) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, sala_id, avaliacao, comentario]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { avaliacao, comentario } = data;
    const queryObject = {};
    const fields = [];
    let query = 'UPDATE reviews SET ';

    if (avaliacao !== undefined) {
      fields.push('avaliacao = $' + (fields.length + 1));
      queryObject[fields.length] = avaliacao;
    }
    if (comentario !== undefined) {
      fields.push('comentario = $' + (fields.length + 1));
      queryObject[fields.length] = comentario;
    }
    fields.push('atualizado_em = CURRENT_TIMESTAMP');

    query += fields.join(', ') + ' WHERE id = $' + (fields.length + 1) + ' RETURNING *';
    queryObject[fields.length] = id;

    const values = Object.values(queryObject);

    if (fields.length === 1) { // Only atualizado_em
        return this.getById(id); // Or handle as no actual update
    }

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Review;
