const express = require('express');
const router = express.Router();
const progressoController = require('../../controllers/progressoController');
const authMiddleware = require('../middlewares/auth');

router.post('/crianca/:crianca_id', authMiddleware, progressoController.registrar);
router.get('/crianca/:crianca_id', authMiddleware, progressoController.listar);

module.exports = router;