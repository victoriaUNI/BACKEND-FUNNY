const path = require('path');
const db = require(path.join(__dirname, '..', 'database', 'db'));

class Atividade {
  static async criar({ titulo, descricao, crianca_id }) {
    const { rows } = await db.query(
      `INSERT INTO atividades (titulo, descricao, crianca_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [titulo, descricao, crianca_id]
    );
    return rows[0];
  }

  static async listarPorCrianca(crianca_id) {
    const { rows } = await db.query(
      'SELECT * FROM atividades WHERE crianca_id = $1',
      [crianca_id]
    );
    return rows;
  }
}

module.exports = Atividade;