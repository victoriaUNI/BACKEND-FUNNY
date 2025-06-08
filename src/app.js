console.log('🔄 Ambiente:', process.env.NODE_ENV);
console.log('🔗 DB Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: '*' // Ou seus domínios específicos
}));

// Middlewares
app.use(cors());
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
  res.status(200).json({ message: 'API esta funcionando' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

module.exports = app;