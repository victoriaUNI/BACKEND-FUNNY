const express = require('express');
const router = express.Router();
const atividadeController = require('../src/controllers/atividadeController');
const authMiddleware = require('../middlewares/auth');

router.post('/crianca/:crianca_id', authMiddleware, atividadeController.criar);
router.get('/crianca/:crianca_id', authMiddleware, atividadeController.listarPorCrianca);

module.exports = router;