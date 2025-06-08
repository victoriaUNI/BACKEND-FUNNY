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

const getSession = async (req, res) => {
    try {
        // Verifica se o usuário está autenticado através do token
        const userId = req.usuario.id;
        
        const result = await pool.query(
            `SELECT r.id, r.nome, u.email 
             FROM usuarios u 
             INNER JOIN responsaveis r ON r.usuario_id = u.id 
             WHERE r.id = $1`,
            [userId]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Sessão não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao buscar sessão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const updatePassword = async (req, res) => {
    try {
        const userId = req.usuario.id;
        const { senha_atual, nova_senha } = req.body;

        // Busca o usuário no banco
        const result = await pool.query(
            'SELECT senha FROM usuarios WHERE id = $1',
            [userId]
        );

        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha atual está correta
        if (senha_atual !== result.rows[0].senha) { // Em produção, use bcrypt
            return res.status(401).json({ error: 'Senha atual incorreta' });
        }

        // Atualiza a senha
        await pool.query(
            'UPDATE usuarios SET senha = $1 WHERE id = $2',
            [nova_senha, userId] // Em produção, use bcrypt para hash
        );

        res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

const logout = async (req, res) => {
    try {
        // Em uma implementação real, você poderia:
        // 1. Adicionar o token a uma lista negra
        // 2. Limpar cookies/storage do cliente
        // 3. Invalidar a sessão no servidor
        
        res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

module.exports = {
    login,
    getSession,
    updatePassword,
    logout
};