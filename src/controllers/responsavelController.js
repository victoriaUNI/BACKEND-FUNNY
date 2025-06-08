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

exports.atualizar = async (req, res, next) => {
  try {
    const { nome, telefone } = req.body;
    const responsavel = await Responsavel.atualizar(req.usuario.id, { nome, telefone });
    
    if (!responsavel) {
      return res.status(404).json({ error: 'Responsável não encontrado' });
    }

    res.json(responsavel);
  } catch (error) {
    next(error);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const removido = await Responsavel.remover(req.usuario.id);
    
    if (!removido) {
      return res.status(404).json({ error: 'Responsável não encontrado' });
    }

    // Também remove o usuário associado
    await Usuario.remover(req.usuario.id);

    res.json({ message: 'Conta removida com sucesso' });
  } catch (error) {
    next(error);
  }
};