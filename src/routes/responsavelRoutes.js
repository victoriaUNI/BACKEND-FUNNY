const path = require('path');
const express = require('express');
const router = express.Router();
const responsavelController = require(path.join(__dirname, '..', 'controllers', 'responsavelController'));
const authMiddleware = require(path.join(__dirname, '..', 'middlewares', 'auth'));

router.post('/', responsavelController.cadastrar);
router.get('/me', authMiddleware, responsavelController.buscar);
module.exports = router;