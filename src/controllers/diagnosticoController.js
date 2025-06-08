const Diagnostico = require('../src/models/Diagnostico');

module.exports = {
  async criar(req, res) {
    try {
      const diagnostico = await Diagnostico.criar({
        ...req.body,
        crianca_id: req.params.crianca_id,
        profissional_id: req.usuario.id
      });
      res.status(201).json(diagnostico);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async listar(req, res) {
    try {
      const diagnosticos = await Diagnostico.buscarPorCrianca(req.params.crianca_id);
      res.json(diagnosticos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};