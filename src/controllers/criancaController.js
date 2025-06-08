const Crianca = require('../src/models/Crianca');

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
  },

  async criar(req, res) {
  try {
    // Verifica se o responsável existe
    const responsavel = await Responsavel.buscarPorUsuario(req.usuario.id);
    if (!responsavel) {
      return res.status(403).json({ erro: 'Apenas responsáveis podem cadastrar crianças' });
    }

    const crianca = await Crianca.criar({
      ...req.body,
      responsavel_id: responsavel.id // Usa o ID do responsável logado
    });
    
    res.status(201).json(crianca);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}
};
