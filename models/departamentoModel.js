const db = require('../config/db');

const Departamento = {
    async create(data) {
        const { nome, responsavel, id_edificio } = data;
        try {
            const result = await db.query(
                'INSERT INTO departamentos (nome, responsavel, id_edificio) VALUES ($1, $2, $3) RETURNING *',
                [nome, responsavel, id_edificio]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async findAll() {
        try {
            const result = await db.query('SELECT * FROM departamentos');
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    async findById(id) {
        try {
            const result = await db.query('SELECT * FROM departamentos WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async update(id, data) {
        const { nome, responsavel, id_edificio } = data;
        try {
            const result = await db.query(
                'UPDATE departamentos SET nome = $1, responsavel = $2, id_edificio = $3 WHERE id = $4 RETURNING *',
                [nome, responsavel, id_edificio, id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    async delete(id) {
        try {
            const result = await db.query('DELETE FROM departamentos WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Departamento;