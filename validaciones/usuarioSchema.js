import Joi from 'joi';
// Esquema de validación para un usuario
// Utiliza Joi para definir las reglas de validación
export const usuarioSchema = Joi.object({
 nombre: Joi.string().min(3).max(30).required(),
 email: Joi.string().email().required(),
 contraseña: Joi.string().min(6).required()
});