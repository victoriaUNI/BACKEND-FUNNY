const Responsavel = require('../src/models/Responsavel');
const Usuario = require('../src/models/Usuario');

module.exports = {
  async cadastrar(req, res) {
    try {
      // Primeiro cria o usuário
      const usuario = await Usuario.criar({
        email: req.body.email,
        senha: req.body.senha,
        tipo: 'responsavel'
      });

      // Depois cria o responsável vinculado
      const responsavel = await Responsavel.criar({
        nome: req.body.nome,
        telefone: req.body.telefone,
        usuario_id: usuario.id
      });

      res.status(201).json({
        id: responsavel.id,
        nome: responsavel.nome,
        email: usuario.email
      });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async buscar(req, res) {
    try {
      const responsavel = await Responsavel.buscarPorUsuario(req.usuario.id);
      if (!responsavel) {
        return res.status(404).json({ erro: 'Responsável não encontrado' });
      }
      res.json(responsavel);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};