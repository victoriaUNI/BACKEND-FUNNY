const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    // Configurações adicionais para Render
    sslmode: 'require'
  },
  connectionTimeoutMillis: 10000
});

// Teste de conexão
pool.on('connect', () => console.log('✅ Conectado ao PostgreSQL'));
pool.on('error', err => console.error('💢 Erro no pool:', err));

module.exports = pool;