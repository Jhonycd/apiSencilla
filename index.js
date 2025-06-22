import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usuariosRoutes from './routes/usuarios.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());

dotenv.config();


// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Conectar a MongoDB
mongoose
 .connect(process.env.MONGO_URI)
 .then(() => console.log('✅ Conectado a MongoDB'))
 .catch((err) => console.error('❌ Error de conexión:', err));

// 👉 Esta parte permite que el servidor solo se levante si lo ejecutás directamente (y no durante los tests)
if (process.env.NODE_ENV !== 'test') {
 const PORT = process.env.PORT || 3000;
 app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
 });
}

export default app; // 👈 Para Supertest y testeo con Jest