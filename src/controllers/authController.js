const Usuario = require('./models/Usuario');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.buscarPorEmail(email);
      
      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ erro: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: usuario.id, tipo: usuario.tipo },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ usuario, token });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};