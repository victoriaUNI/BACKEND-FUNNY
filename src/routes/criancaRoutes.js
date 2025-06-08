const express = require('express');
const router = express.Router();
const criancaController = require('../../controllers/criancaController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, criancaController.criar);
router.get('/responsavel/:responsavel_id', authMiddleware, criancaController.listarPorResponsavel);

module.exports = router;