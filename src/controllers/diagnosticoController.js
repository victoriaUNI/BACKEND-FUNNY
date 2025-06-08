const path = require('path');
const Diagnostico = require(path.join(__dirname, '..', 'models', 'diagnosticoModel'));

exports.criar = async (req, res, next) => {
  try {
    const diagnostico = await Diagnostico.criar({
      ...req.body,
      crianca_id: req.params.crianca_id,
      profissional_id: req.usuario.id
    });
    res.status(201).json(diagnostico);
  } catch (error) {
    next(error);
  }
};