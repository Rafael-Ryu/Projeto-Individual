const db = require('../config/db');

class ImagemSala {
  static async getAll() {
    const result = await db.query('SELECT * FROM imagem_sala');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM imagem_sala WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getBySalaId(sala_id) {
    const result = await db.query('SELECT * FROM imagem_sala WHERE sala_id = $1', [sala_id]);
    return result.rows;
  }

  static async create(data) {
    const { sala_id, url_imagem, descricao } = data;
    const result = await db.query(
      'INSERT INTO imagem_sala (sala_id, url_imagem, descricao) VALUES ($1, $2, $3) RETURNING *',
      [sala_id, url_imagem, descricao]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { url_imagem, descricao } = data;
    const result = await db.query(
      'UPDATE imagem_sala SET url_imagem = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [url_imagem, descricao, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM imagem_sala WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = ImagemSala;
