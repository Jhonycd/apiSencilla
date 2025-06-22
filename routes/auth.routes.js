import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import validarEsquema from '../middlewares/validarEsquema.js';
import { usuarioSchema } from '../validaciones/usuarioSchema.js';

const router = express.Router();

// Registro de usuario
router.post('/registro', validarEsquema(usuarioSchema), async (req, res) => {
 try {
  console.log('📥 Registro - payload recibido:', req.body);

  const { nombre, email, contraseña } = req.body;

  // Verificar si ya existe el email
  const existente = await Usuario.findOne({ email });
  if (existente) {
   return res.status(400).json({ mensaje: 'El correo ya está registrado' });
  }

  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  const contraseñaHash = await bcrypt.hash(contraseña, salt);

  const nuevoUsuario = new Usuario({ nombre, email, contraseña: contraseñaHash });
  await nuevoUsuario.save();

  res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
 } catch (error) {
  console.error('❌ Error en registro:', error.message);

  if (error.code === 11000 && error.keyPattern?.email) {
   return res.status(400).json({ mensaje: 'El correo ya está registrado' });
  }

  res.status(500).json({ mensaje: 'Error al registrar usuario' });
 }
});

// Login de usuario
router.post('/login', async (req, res) => {
 try {
  console.log('📥 Login - payload recibido:', req.body);

  const { email, contraseña } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
   return res.status(400).json({ mensaje: 'Usuario no encontrado' });
  }

  const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!esValida) {
   return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
   expiresIn: '1h'
  });

  res.status(200).json({
   mensaje: 'Inicio de sesión exitoso',
   token
  });
 } catch (error) {
  console.error('❌ Error en login:', error.message);
  res.status(500).json({ mensaje: 'Error al iniciar sesión' });
 }
});

export default router;