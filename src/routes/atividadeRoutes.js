const path = require('path');
const express = require('express');
const router = express.Router();
const atividadeController = require(path.join(__dirname, '..', 'controllers', 'atividadeController'));
const authMiddleware = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/crianca/:crianca_id', authMiddleware, atividadeController.criar);
router.get('/crianca/:crianca_id', authMiddleware, atividadeController.listar);
router.delete('/:id', authMiddleware, atividadeController.remover);

module.exports = router;