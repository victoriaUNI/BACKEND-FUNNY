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

exports.listar = async (req, res, next) => {
  try {
    const { crianca_id } = req.params;
    const diagnosticos = await Diagnostico.buscarPorCrianca(crianca_id);
    res.json(diagnosticos);
  } catch (error) {
    next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const diagnostico = await Diagnostico.atualizar(id, {
      ...req.body,
      profissional_id: req.usuario.id
    });
    
    if (!diagnostico) {
      return res.status(404).json({ error: 'Diagnóstico não encontrado' });
    }

    res.json(diagnostico);
  } catch (error) {
    next(error);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await Diagnostico.remover(id);
    
    if (!removido) {
      return res.status(404).json({ error: 'Diagnóstico não encontrado' });
    }

    res.json({ message: 'Diagnóstico removido com sucesso' });
  } catch (error) {
    next(error);
  }
};