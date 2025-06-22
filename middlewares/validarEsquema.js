const validarEsquema = (schema) => {
 return (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
   return res.status(400).json({
    mensaje: 'Datos inválidos',
    detalles: error.details.map(d => d.message)
   });
  }
  next();
 };
};

export default validarEsquema;