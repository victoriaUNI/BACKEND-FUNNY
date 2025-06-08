const path = require('path');
const express = require('express');
const router = express.Router();
const diagnosticoController = require(path.join(__dirname, '..', 'controllers', 'diagnosticoController'));
const { authMiddleware, isProfissional } = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/crianca/:crianca_id', authMiddleware, isProfissional, diagnosticoController.criar);
router.get('/crianca/:crianca_id', authMiddleware, diagnosticoController.listar);

module.exports = router;