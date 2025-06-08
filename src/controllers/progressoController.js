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

exports.atualizar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { pontuacao, observacoes } = req.body;
    
    const progresso = await Progresso.atualizar(id, {
      pontuacao,
      observacoes,
      data_realizacao: new Date()
    });

    if (!progresso) {
      return res.status(404).json({ error: 'Progresso não encontrado' });
    }

    res.json(progresso);
  } catch (error) {
    next(error);
  }
};

exports.remover = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await Progresso.remover(id);
    
    if (!removido) {
      return res.status(404).json({ error: 'Progresso não encontrado' });
    }

    res.json({ message: 'Progresso removido com sucesso' });
  } catch (error) {
    next(error);
  }
};