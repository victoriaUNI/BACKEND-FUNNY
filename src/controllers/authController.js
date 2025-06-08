const jwt = require('jsonwebtoken');
const pool = require('../database/db');

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica se o email e senha foram fornecidos
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        // Busca o usuário e responsável no banco de dados
        const result = await pool.query(
            `SELECT r.id, r.nome, u.email, u.senha 
             FROM usuarios u 
             INNER JOIN responsaveis r ON r.usuario_id = u.id 
             WHERE u.email = $1`,
            [email]
        );

        const responsavel = result.rows[0];

        // Verifica se o responsável existe
        if (!responsavel) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Verifica se a senha está correta
        if (senha !== responsavel.senha) { // Em produção, use bcrypt para comparar senhas
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { 
                id: responsavel.id,
                nome: responsavel.nome,
                email: responsavel.email
            },
            process.env.JWT_SECRET || 'sua_chave_secreta',
            { expiresIn: '24h' }
        );

        // Retorna o token e informações do usuário
        res.json({
            token,
            usuario: {
                id: responsavel.id,
                nome: responsavel.nome,
                email: responsavel.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    login
};