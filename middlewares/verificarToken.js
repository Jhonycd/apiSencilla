import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
 const header = req.header('Authorization');

 if (!header) {
  return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
 }

 const token = header.startsWith('Bearer ')
  ? header.split(' ')[1]
  : header;

 try {
  const verificado = jwt.verify(token, process.env.JWT_SECRET || 'CLAVESECRETA');
  req.usuario = verificado;
  next();
 } catch (error) {
  console.error('❌ Error al verificar token:', error.message);
  res.status(400).json({ mensaje: 'Token no válido' });
 }
};

export default verificarToken;