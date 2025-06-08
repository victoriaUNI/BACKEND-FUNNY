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

exports.atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crianca = await Crianca.atualizar(id, req.body);
    
    if (!crianca) {
      return res.status(404).json({ error: 'Criança não encontrada' });
    }

    res.json(crianca);
  } catch (error) {
    next(error);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await Crianca.remover(id);
    
    if (!removido) {
      return res.status(404).json({ error: 'Criança não encontrada' });
    }

    res.json({ message: 'Criança removida com sucesso' });
  } catch (error) {
    next(error);
  }
};