const db = require('../database/db');

class Responsavel {
  static async criar({ nome, telefone, usuario_id }) {
    const { rows } = await db.query(
      `INSERT INTO responsaveis (nome, telefone, usuario_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [nome, telefone, usuario_id]
    );
    return rows[0];
  }

  static async buscarPorUsuario(usuario_id) {
    const { rows } = await db.query(
      'SELECT * FROM responsaveis WHERE usuario_id = $1',
      [usuario_id]
    );
    return rows[0];
  }
}

module.exports = Responsavel;