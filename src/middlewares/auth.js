const path = require('path');
const jwt = require('jsonwebtoken');
const Usuario = require(path.join(__dirname, '..', 'models', 'usuarioModel'));

const authMiddleware = (req, res, next) => {
    try {
        // Pega o token do header
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        // O token vem como "Bearer <token>", então precisamos pegar apenas o token
        const [, token] = authHeader.split(' ');

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        try {
            // Verifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sua_chave_secreta');
            
            // Adiciona as informações do usuário decodificadas à requisição
            req.usuario = decoded;
            
            return next();
        } catch (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao autenticar' });
    }
};

const isProfissional = (req, res, next) => {
    if (!req.usuario || req.usuario.tipo !== 'profissional') {
        return res.status(403).json({ error: 'Acesso permitido apenas para profissionais' });
    }
    next();
};

module.exports = {
    authMiddleware,
    isProfissional
};