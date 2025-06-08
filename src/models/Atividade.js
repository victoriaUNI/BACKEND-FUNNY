const db = require('../../database/db');

class Atividade {
  static async criar({ titulo, descricao, data_inicio, data_fim, status, usuario_id }) {
    const query = `
      INSERT INTO atividades (titulo, descricao, data_inicio, data_fim, status, usuario_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [titulo, descricao, data_inicio, data_fim, status, usuario_id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async listarPorUsuario(usuario_id) {
    const { rows } = await db.query('SELECT * FROM atividades WHERE usuario_id = $1', [usuario_id]);
    return rows;
  }

  static async atualizar(id, { titulo, descricao, data_inicio, data_fim, status }) {
    const query = `
      UPDATE atividades
      SET titulo = $1, descricao = $2, data_inicio = $3, data_fim = $4, status = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [titulo, descricao, data_inicio, data_fim, status, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  static async deletar(id) {
    const { rows } = await db.query('DELETE FROM atividades WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
}

module.exports = Atividade;