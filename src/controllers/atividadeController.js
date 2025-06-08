const path = require('path');
const Atividade = require(path.join(__dirname, '..', 'models', 'atividadeModel'));

exports.criar = async (req, res, next) => {
  try {
    const atividade = await Atividade.criar({
      ...req.body,
      crianca_id: req.params.crianca_id
    });
    res.status(201).json(atividade);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const atividades = await Atividade.listarPorCrianca(req.params.crianca_id);
    res.json(atividades);
  } catch (error) {
    next(error);
  }
};