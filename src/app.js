const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Logs iniciais
console.log('🔄 Ambiente:', process.env.NODE_ENV);
console.log('🔗 DB Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rotas
app.use('/auth', require(path.join(__dirname, 'routes', 'authRoutes')));
app.use('/responsaveis', require(path.join(__dirname, 'routes', 'responsavelRoutes')));
app.use('/criancas', require(path.join(__dirname, 'routes', 'criancaRoutes')));
app.use('/atividades', require(path.join(__dirname, 'routes', 'atividadeRoutes')));
app.use('/diagnosticos', require(path.join(__dirname, 'routes', 'diagnosticoRoutes')));
app.use('/progressos', require(path.join(__dirname, 'routes', 'progressoRoutes')));

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API Funny está funcionando!' });
});

// Middleware de erro (DEVE SER O ÚLTIMO)
app.use((err, req, res, next) => {
  console.error('❌ ERRO:', err.message);
  res.status(500).json({ error: 'Erro interno' });
});

module.exports = app;