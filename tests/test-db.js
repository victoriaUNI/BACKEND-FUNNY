// test-db.js
const { Pool } = require('pg');
require('dotenv').config();

// Configuração do pool de conexão
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função para testar a conexão
async function testConnection() {
  let client;
  try {
    console.log('🔄 Tentando conectar ao banco de dados...');
    console.log(`📌 URL: ${process.env.DATABASE_URL.split('@')[1]}`);
    
    client = await pool.connect();
    console.log('✅ Conexão estabelecida com sucesso!');
    
    // Teste de consulta simples
    const res = await client.query('SELECT NOW() as current_time');
    console.log('⏱️ Hora atual no banco:', res.rows[0].current_time);
    
    // Verifique tabelas existentes
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📊 Tabelas existentes:', tables.rows.map(r => r.table_name));
    
  } catch (err) {
    console.error('❌ ERRO na conexão:', err.message);
    console.error('Stack:', err.stack);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

// Adicione no início do test-db.js:
console.log("🟢 Iniciando teste de conexão...");
require('dotenv').config();
console.log("🔵 Variáveis de ambiente carregadas");

testConnection();