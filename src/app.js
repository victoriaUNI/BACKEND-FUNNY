const express = require('express');
const cors = require('cors');
const app = express();

// Logs iniciais (após inicialização do app)
console.log('🔄 Ambiente:', process.env.NODE_ENV);
console.log('🔗 DB Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);

// Middlewares (CORRETO: cors() apenas uma vez)
app.use(cors({
  origin: '*' // Ou seus domínios específicos
}));
app.use(express.json());

// Rotas
app.use('/auth', require('./routes/authRoutes'));
app.use('/criancas', require('./routes/criancaRoutes'));
app.use('/atividades', require('./routes/atividadeRoutes'));
app.use('/progressos', require('./routes/progressoRoutes'));
app.use('/diagnosticos', require('./routes/diagnosticoRoutes'));
app.use('/responsaveis', require('./routes/responsavelRoutes'));

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 'API Funny está funcionando!' });
});

// Middleware de erro (DEVE SER O ÚLTIMO - após todas as rotas)
app.use((err, req, res, next) => {
  console.error('❌ ERRO:', err.message);
  console.error('📌 Stack:', err.stack);
  res.status(500).json({ error: 'Erro interno' });
});

module.exports = app;