const path = require('path');
const db = require(path.join(__dirname, '..', 'database', 'db'));

class Diagnostico {
  static async criar({ crianca_id, observacoes, profissional_id }) {
    const { rows } = await db.query(
      `INSERT INTO diagnosticos (crianca_id, observacoes, profissional_id) 
       VALUES ($1, $2, $3) RETURNING *`,
      [crianca_id, observacoes, profissional_id]
    );
    return rows[0];
  }

  static async buscarPorCrianca(crianca_id) {
    const { rows } = await db.query(
      'SELECT * FROM diagnosticos WHERE crianca_id = $1',
      [crianca_id]
    );
    return rows;
  }
}

module.exports = Diagnostico;