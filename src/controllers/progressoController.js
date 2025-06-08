const Progresso = require('../src/models/Progresso');

module.exports = {
  async registrar(req, res) {
    try {
      const progresso = await Progresso.registrar({
        ...req.body,
        crianca_id: req.params.crianca_id
      });
      res.status(201).json(progresso);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const progressos = await Progresso.listarPorCrianca(req.params.crianca_id);
      res.json(progressos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};