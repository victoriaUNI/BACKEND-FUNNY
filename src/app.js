// Versão mínima para diagnóstico
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

// Configuração explícita do pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware de logging
app.use((req, _, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rota de saúde SUPER simplificada
app.get('/', async (_, res) => {
  try {
    const dbTest = await pool.query('SELECT NOW()');
    res.json({
      status: 'online',
      db: dbTest.rows[0],
      env: {
        node_env: process.env.NODE_ENV,
        db_host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]
      }
    });
  } catch (err) {
    console.error('ERRO FATAL:', err);
    res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : 'hidden'
    });
  }
});

// Export para Vercel
module.exports = app;

// Log inicial
console.log('🟢 Ambiente:', process.env.NODE_ENV);
console.log('🔗 DB Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);