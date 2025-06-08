const pool = require('./db');

async function createTables() {
  try {
    // Criando tabela de usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(100) NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando tabela de responsáveis
    await pool.query(`
      CREATE TABLE IF NOT EXISTS responsaveis (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        telefone VARCHAR(20),
        usuario_id INTEGER REFERENCES usuarios(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando tabela de crianças
    await pool.query(`
      CREATE TABLE IF NOT EXISTS criancas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        idade INTEGER NOT NULL,
        responsavel_id INTEGER REFERENCES responsaveis(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando tabela de atividades
    await pool.query(`
      CREATE TABLE IF NOT EXISTS atividades (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        descricao TEXT,
        tipo VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando tabela de diagnósticos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS diagnosticos (
        id SERIAL PRIMARY KEY,
        crianca_id INTEGER REFERENCES criancas(id),
        descricao TEXT NOT NULL,
        data_diagnostico DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Criando tabela de progressos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS progressos (
        id SERIAL PRIMARY KEY,
        crianca_id INTEGER REFERENCES criancas(id),
        atividade_id INTEGER REFERENCES atividades(id),
        pontuacao INTEGER NOT NULL,
        observacoes TEXT,
        data_realizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Tabelas criadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error);
    process.exit(1);
  }
}

createTables(); 