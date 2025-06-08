const path = require('path');
const Crianca = require(path.join(__dirname, '..', 'models', 'criancaModel'));

exports.criar = async (req, res, next) => {
  try {
    const crianca = await Crianca.criar({
      ...req.body,
      responsavel_id: req.usuario.id
    });
    res.status(201).json(crianca);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const criancas = await Crianca.listarPorResponsavel(req.usuario.id);
    res.json(criancas);
  } catch (error) {
    next(error);
  }
};