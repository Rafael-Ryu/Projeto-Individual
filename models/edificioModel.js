const db = require('../config/db');

const Edificio = {
    async create(data) {
        const { nome, endereco, descricao, andar, horario_abertura, horario_fechamento, esta_ativo } = data;

        // Garantir que andar tenha um valor padrão se não fornecido
        const andarValue = andar !== undefined && andar !== null ? andar : 1;

        try {
            const result = await db.query(
                'INSERT INTO edificios (nome, endereco, descricao, andar, horario_abertura, horario_fechamento, esta_ativo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [nome, endereco, descricao, andarValue, horario_abertura, horario_fechamento, esta_ativo]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async findAll() {
        try {
            const result = await db.query('SELECT * FROM edificios');
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async findById(id) {
        try {
            const result = await db.query('SELECT * FROM edificios WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async update(id, data) {
        const { nome, endereco, descricao, andar, horario_abertura, horario_fechamento, esta_ativo } = data;
        const queryParams = [];
        const setClauses = [];
        let paramIndex = 1;

        if (nome !== undefined) { setClauses.push(`nome = $${paramIndex++}`); queryParams.push(nome); }
        if (endereco !== undefined) { setClauses.push(`endereco = $${paramIndex++}`); queryParams.push(endereco); }
        if (descricao !== undefined) { setClauses.push(`descricao = $${paramIndex++}`); queryParams.push(descricao); }
        if (andar !== undefined) { setClauses.push(`andar = $${paramIndex++}`); queryParams.push(andar); }
        if (horario_abertura !== undefined) { setClauses.push(`horario_abertura = $${paramIndex++}`); queryParams.push(horario_abertura); }
        if (horario_fechamento !== undefined) { setClauses.push(`horario_fechamento = $${paramIndex++}`); queryParams.push(horario_fechamento); }
        if (esta_ativo !== undefined) { setClauses.push(`esta_ativo = $${paramIndex++}`); queryParams.push(esta_ativo); }

        if (setClauses.length === 0) {
            return this.findById(id);
        }

        queryParams.push(id);
        const queryText = `UPDATE edificios SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

        try {
            const result = await db.query(queryText, queryParams);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async delete(id) {
        try {
            const result = await db.query('DELETE FROM edificios WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Edificio;