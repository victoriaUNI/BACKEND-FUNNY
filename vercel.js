const app = require('./src/app');
const db = require('./src/database/db');

// Teste de conexão imediato
db.query('SELECT NOW()')
  .then(() => console.log('✅ Conexão com o BD verificada'))
  .catch(err => {
    console.error('❌ Falha na conexão:', err);
    process.exit(1);
  });

module.exports = app;