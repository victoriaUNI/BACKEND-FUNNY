// migrate.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const SQL_COMMANDS = `
-- Criação das tabelas
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(100) NOT NULL,
  tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('responsavel', 'profissional'))
);

CREATE TABLE IF NOT EXISTS responsaveis (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Adicione aqui as outras tabelas (criancas, atividades, etc)
`;

async function runMigrations() {
  const client = await pool.connect();
  try {
    console.log('▶️ Executando migrações...');
    await client.query(SQL_COMMANDS);
    console.log('✅ Tabelas criadas com sucesso!');
  } catch (err) {
    console.error('❌ Erro nas migrações:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();