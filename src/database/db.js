const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    // Configurações adicionais para Render
    sslmode: 'require'
  },
  connectionTimeoutMillis: 10000 // Aumente o timeout
});

// Teste de conexão
pool.connect()
  .then(client => {
    console.log('✅ Conexão com o banco estabelecida!');
    client.release();
  })
  .catch(err => {
    console.error('❌ ERRO na conexão:', err.message);
    process.exit(1); // Encerra o app se não conectar
  });

module.exports = pool;