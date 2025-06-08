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
app.use('/auth', require('./routes/authRoutes'));
app.use('/responsaveis', require('./routes/responsavelRoutes'));
app.use('/criancas', require('./routes/criancaRoutes'));
app.use('/atividades', require('./routes/atividadeRoutes'));
app.use('/diagnosticos', require('./routes/diagnosticoRoutes'));
app.use('/progressos', require('./routes/progressoRoutes'));

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API Funny está funcionando!' });
});

// Middleware de erro (DEVE SER O ÚLTIMO)
app.use((err, req, res, next) => {
  console.error('❌ ERRO:', err.message);
  res.status(500).json({ error: 'Erro interno' });
});

// Configuração da porta e inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;