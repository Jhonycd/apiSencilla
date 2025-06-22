import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
 const token = req.header('Authorization');
 if (!token) {
  return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
 }

 try {
  const verificado = jwt.verify(token, process.env.JWT_SECRET || 'CLAVESECRETA');
  req.usuario = verificado;
  next();
 } catch (error) {
  res.status(400).json({ mensaje: 'Token no válido' });
 }
};

export default verificarToken;