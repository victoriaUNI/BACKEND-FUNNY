const path = require('path');
const express = require('express');
const router = express.Router();
const progressoController = require(path.join(__dirname, '..', 'controllers', 'progressoController'));
const { authMiddleware } = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/crianca/:crianca_id', authMiddleware, progressoController.registrar);
router.get('/crianca/:crianca_id', authMiddleware, progressoController.listar);

module.exports = router;