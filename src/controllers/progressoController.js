const path = require('path');
const Progresso = require(path.join(__dirname, '..', 'models', 'progressoModel'));

exports.registrar = async (req, res, next) => {
  try {
    const progresso = await Progresso.registrar({
      ...req.body,
      crianca_id: req.params.crianca_id
    });
    res.status(201).json(progresso);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const { crianca_id } = req.params;
    const progressos = await Progresso.listarPorCrianca(crianca_id);
    res.json(progressos);
  } catch (error) {
    next(error);
  }
};