const path = require('path');
const Atividade = require(path.join(__dirname, '..', 'models', 'atividadeModel'));
const pool = require('../database/db');

exports.criar = async (req, res) => {
  try {
    const { crianca_id } = req.params;
    const { titulo, descricao, tipo } = req.body;

    // Validações básicas
    if (!titulo || !tipo) {
      return res.status(400).json({ error: 'Título e tipo são obrigatórios' });
    }

    const result = await pool.query(
      `INSERT INTO atividades (titulo, descricao, tipo)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [titulo, descricao, tipo]
    );

    const atividade = result.rows[0];

    // Criar o registro de progresso inicial
    await pool.query(
      `INSERT INTO progressos (crianca_id, atividade_id, pontuacao)
       VALUES ($1, $2, $3)`,
      [crianca_id, atividade.id, 0]
    );

    res.status(201).json(atividade);
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.listar = async (req, res) => {
  try {
    const { crianca_id } = req.params;

    const result = await pool.query(
      `SELECT a.*, p.pontuacao, p.observacoes, p.data_realizacao
       FROM atividades a
       LEFT JOIN progressos p ON a.id = p.atividade_id AND p.crianca_id = $1
       ORDER BY p.data_realizacao DESC`,
      [crianca_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar atividades:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, tipo } = req.body;

    // Validações básicas
    if (!titulo || !tipo) {
      return res.status(400).json({ error: 'Título e tipo são obrigatórios' });
    }

    const result = await pool.query(
      `UPDATE atividades 
       SET titulo = $1, descricao = $2, tipo = $3
       WHERE id = $4
       RETURNING *`,
      [titulo, descricao, tipo, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

exports.remover = async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro remove os progressos relacionados
    await pool.query('DELETE FROM progressos WHERE atividade_id = $1', [id]);

    // Depois remove a atividade
    const result = await pool.query(
      'DELETE FROM atividades WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Atividade não encontrada' });
    }

    res.json({ message: 'Atividade removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover atividade:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};