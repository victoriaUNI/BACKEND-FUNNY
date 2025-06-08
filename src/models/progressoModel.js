const path = require('path');
const db = require(path.join(__dirname, '..', 'database', 'db'));

class Progresso {
  static async registrar({ crianca_id, habilidade, nivel }) {
    const { rows } = await db.query(
      `INSERT INTO progressos (crianca_id, habilidade, nivel) 
       VALUES ($1, $2, $3) RETURNING *`,
      [crianca_id, habilidade, nivel]
    );
    return rows[0];
  }

  static async listarPorCrianca(crianca_id) {
    const { rows } = await db.query(
      'SELECT * FROM progressos WHERE crianca_id = $1',
      [crianca_id]
    );
    return rows;
  }
}

module.exports = Progresso;