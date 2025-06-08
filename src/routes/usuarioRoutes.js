const path = require('path');
const express = require('express');
const router = express.Router();
const usuarioController = require(path.join(__dirname, '..', 'controllers', 'usuarioController'));
const { authMiddleware } = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/registro', usuarioController.registrar);
router.get('/perfil', authMiddleware, usuarioController.buscarPerfil);

module.exports = router;