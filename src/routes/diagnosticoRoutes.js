const express = require('express');
const router = express.Router();
const diagnosticoController = require('./controllers/diagnosticoController');
const authMiddleware = require('../middlewares/auth');
const isProfissional = require('../middlewares/isProfissional');

router.post('/crianca/:crianca_id', authMiddleware, isProfissional, diagnosticoController.criar);
router.get('/crianca/:crianca_id', authMiddleware, diagnosticoController.listar);

module.exports = router;