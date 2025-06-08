const path = require('path');
const Responsavel = require(path.join(__dirname, '..', 'models', 'responsavelModel'));
const Usuario = require(path.join(__dirname, '..', 'models', 'usuarioModel'));

exports.cadastrar = async (req, res, next) => {
  try {
    const { nome, telefone, email, senha } = req.body;
    const usuario = await Usuario.criar(email, senha, 'responsavel');
    const responsavel = await Responsavel.criar({ nome, telefone, usuario_id: usuario.id });
    res.status(201).json(responsavel);
  } catch (error) {
    next(error);
  }
};

exports.buscar = async (req, res, next) => {
  try {
    const responsavel = await Responsavel.buscarPorUsuario(req.usuario.id);
    res.json(responsavel);
  } catch (error) {
    next(error);
  }
};