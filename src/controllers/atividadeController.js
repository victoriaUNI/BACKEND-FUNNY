const Crianca = require('../models/Crianca');

module.exports = {
  async criar(req, res) {
    try {
      const crianca = await Crianca.criar(req.body);
      res.status(201).json(crianca);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async listarPorResponsavel(req, res) {
    try {
      const criancas = await Crianca.listarPorResponsavel(req.params.responsavel_id);
      res.json(criancas);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};