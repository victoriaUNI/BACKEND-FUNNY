const path = require('path');
const express = require('express');
const router = express.Router();
const criancaController = require(path.join(__dirname, '..', 'controllers', 'criancaController'));
const authMiddleware = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/', authMiddleware, criancaController.criar);
router.get('/', authMiddleware, criancaController.listar);
module.exports = router;