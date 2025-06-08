const path = require('path');
const jwt = require('jsonwebtoken');
const Usuario = require(path.join(__dirname, '..', 'models', 'usuarioModel'));

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Token não fornecido');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.buscarPorId(decoded.id);
    
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    res.status(401).json({ error: 'Não autorizado' });
  }
};