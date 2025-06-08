const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false,
    sslmode: 'require'
  }
});

// Teste de conexão
pool.on('connect', () => console.log('🛢️  Conectado ao PostgreSQL'));
pool.on('error', err => console.error('💢 Erro no pool:', err));

module.exports = pool;