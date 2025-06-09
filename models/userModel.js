const db = require('../config/db');

class User {
  static async getAll() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async updateLastLogin(id) {
    const result = await db.query(
      'UPDATE usuarios SET ultimo_login = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  static async create(data) {
    const { nome, email, password_hash, telefone, imagem_perfil, departamento, esta_ativo } = data;
    const query = `
      INSERT INTO usuarios (nome, email, password_hash, telefone, imagem_perfil, departamento, esta_ativo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [nome, email, password_hash, telefone, imagem_perfil, departamento, esta_ativo === undefined ? true : esta_ativo];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async update(id, data) {
    const { nome, email, password_hash, telefone, imagem_perfil, departamento, esta_ativo } = data;
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (nome !== undefined) { fields.push(`nome = $${paramCount++}`); values.push(nome); }
    if (email !== undefined) { fields.push(`email = $${paramCount++}`); values.push(email); }
    if (password_hash !== undefined) { fields.push(`password_hash = $${paramCount++}`); values.push(password_hash); }
    if (telefone !== undefined) { fields.push(`telefone = $${paramCount++}`); values.push(telefone); }
    if (imagem_perfil !== undefined) { fields.push(`imagem_perfil = $${paramCount++}`); values.push(imagem_perfil); }
    if (departamento !== undefined) { fields.push(`departamento = $${paramCount++}`); values.push(departamento); }
    if (esta_ativo !== undefined) { fields.push(`esta_ativo = $${paramCount++}`); values.push(esta_ativo); }
    
    if (fields.length === 0) {
      return this.getById(id);
    }

    values.push(id);
    const query = `UPDATE usuarios SET ${fields.join(', ')}, atualizado_em = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;
    
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Métodos para reset de senha
  static async saveResetCode(userId, code) {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    const result = await db.query(
      'UPDATE usuarios SET reset_code = $1, reset_code_expires = $2 WHERE id = $3 RETURNING *',
      [code, expiresAt, userId]
    );
    return result.rows[0];
  }

  static async verifyResetCode(userId, code) {
    const result = await db.query(
      'SELECT * FROM usuarios WHERE id = $1 AND reset_code = $2 AND reset_code_expires > CURRENT_TIMESTAMP',
      [userId, code]
    );
    return result.rows.length > 0;
  }

  static async updatePassword(userId, passwordHash) {
    const result = await db.query(
      'UPDATE usuarios SET password_hash = $1, atualizado_em = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [passwordHash, userId]
    );
    return result.rows[0];
  }

  static async clearResetCode(userId) {
    const result = await db.query(
      'UPDATE usuarios SET reset_code = NULL, reset_code_expires = NULL WHERE id = $1 RETURNING *',
      [userId]
    );
    return result.rows[0];
  }
}

module.exports = User;
