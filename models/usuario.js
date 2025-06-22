import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
 nombre: {
  type: String,
  required: true,
  minlength: 3
 },
 email: {
  type: String,
  required: true,
  unique: true, // No permite duplicados
  match: /.+\@.+\..+/ // Validación básica de formato
 },
 contraseña: {
  type: String,
  required: true,
  minlength: 6
 }
});

const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
export default Usuario;

