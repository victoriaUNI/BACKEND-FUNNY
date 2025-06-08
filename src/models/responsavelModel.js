const pool = require('../database/db');

class Responsavel {
  static async criar({ nome, telefone, usuario_id }) {
    const result = await pool.query(
      `INSERT INTO responsaveis (nome, telefone, usuario_id) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [nome, telefone, usuario_id]
    );
    return result.rows[0];
  }

  static async buscarPorUsuario(usuario_id) {
    const result = await pool.query(
      'SELECT * FROM responsaveis WHERE usuario_id = $1',
      [usuario_id]
    );
    return result.rows[0];
  }

  static async buscarPorEmail(email) {
    const result = await pool.query(
      'SELECT r.* FROM responsaveis r JOIN usuarios u ON r.usuario_id = u.id WHERE u.email = $1',
      [email]
    );
    return result.rows[0];
  }
}

module.exports = Responsavel;