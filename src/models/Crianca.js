const db = require('../src/database/db');

class Crianca {
  static async criar({ nome, idade, responsavel_id }) {
    const { rows } = await db.query(
      `INSERT INTO criancas (nome, idade, responsavel_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [nome, idade, responsavel_id]
    );
    return rows[0];
  }

  static async listarPorResponsavel(responsavel_id) {
    const { rows } = await db.query(
      'SELECT * FROM criancas WHERE responsavel_id = $1',
      [responsavel_id]
    );
    return rows;
  }
}

module.exports = Crianca;