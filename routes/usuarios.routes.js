import express from 'express';
import Usuario from '../models/Usuario.js';
import validarEsquema from '../middlewares/validarEsquema.js';
import verificarToken from '../middlewares/verificarToken.js';
import { usuarioSchema } from '../validaciones/usuarioSchema.js';

const router = express.Router();

// Ruta protegida primero (para test)
router.get('/privado', verificarToken, (req, res) => {
 console.log('🧾 Usuario decodificado desde token:', req.usuario);
 res.json({
  mensaje: 'Accediste a una ruta protegida 🎉',
  usuario: req.usuario
 });
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
 try {
  const usuarios = await Usuario.find();
  res.json(usuarios);
 } catch (error) {
  res.status(500).json({ mensaje: 'Error al obtener usuarios' });
 }
});

// Obtener un solo usuario por ID
router.get('/:id', async (req, res) => {
 try {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
 } catch (error) {
  res.status(500).json({ mensaje: 'Error al buscar usuario' });
 }
});

// Crear un nuevo usuario
router.post('/', validarEsquema(usuarioSchema), async (req, res) => {
 try {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
 } catch (error) {
  res.status(400).json({ mensaje: 'Error al crear usuario' });
 }
});

// Actualizar un usuario existente
router.put('/:id', validarEsquema(usuarioSchema), async (req, res) => {
 try {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
   new: true
  });
  if (!usuarioActualizado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuarioActualizado);
 } catch (error) {
  res.status(400).json({ mensaje: 'Error al actualizar usuario' });
 }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
 try {
  const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
  if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json({ mensaje: 'Usuario eliminado correctamente' });
 } catch (error) {
  res.status(500).json({ mensaje: 'Error al eliminar usuario' });
 }
});

export default router;