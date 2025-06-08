const express = require('express');
const router = express.Router();
const responsavelController = require('../src/controllers/responsavelController');
const authMiddleware = require('../middlewares/auth');

// Cadastro público (sem autenticação)
router.post('/', responsavelController.cadastrar);

// Rotas autenticadas
router.get('/me', authMiddleware, responsavelController.buscar);

module.exports = router;