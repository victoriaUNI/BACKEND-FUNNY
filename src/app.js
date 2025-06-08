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
  res.json({ status: 'API Funny está funcionando!' });
});

module.exports = app;