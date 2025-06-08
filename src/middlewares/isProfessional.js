module.exports = (req, res, next) => {
  if (req.usuario.tipo !== 'profissional') {
    return res.status(403).json({ erro: 'Acesso restrito a profissionais' });
  }
  next();
};