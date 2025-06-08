const path = require('path');
const Usuario = require(path.join(__dirname, '..', 'models', 'usuarioModel'));
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
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
    next(error);
  }
};