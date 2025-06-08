const path = require('path');
const db = require(path.join(__dirname, '..', 'database', 'db'));

class Usuario {
  static async criar({ email, senha, tipo }) {
    const { rows } = await db.query(
      `INSERT INTO usuarios (email, senha, tipo) 
       VALUES ($1, $2, $3) RETURNING *`,
      [email, senha, tipo]
    );
    return rows[0];
  }

  static async buscarPorEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM usuarios WHERE email = $1', 
      [email]
    );
    return rows[0];
  }
}

module.exports = Usuario;