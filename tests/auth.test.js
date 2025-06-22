import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';
import Usuario from '../models/usuario.js';

const api = request(app);

const testUser = {
 nombre: 'Tester',
 email: 'tester@example.com',
 contraseña: 'test1234'
};

beforeAll(async () => {
 try {
  await mongoose.connect(process.env.MONGO_URI);
 } catch (e) {
  console.error('❌ Error de conexión:', e.message);
 }
});


afterAll(async () => {
 await mongoose.connection.close();
});

describe('🧪 Autenticación de usuarios', () => {
 let token = '';

 test('▶️ Registro exitoso', async () => {
  const res = await api
   .post('/api/auth/registro')
   .send(testUser);

  expect(res.statusCode).toBe(201);
  expect(res.body.mensaje).toMatch(/registrado/i);
 });

 test('🔑 Login exitoso y devuelve token', async () => {
  const res = await api
   .post('/api/auth/login')
   .send({
    email: testUser.email,
    contraseña: testUser.contraseña
   });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();

  token = res.body.token;
 });

 test('🔒 Accede a ruta protegida con token', async () => {
  const res = await api
   .get('/api/usuarios/privado')
   .set('Authorization', token);

  expect(res.statusCode).toBe(200);
  expect(res.body.usuario).toBeDefined();
 });

 afterAll(async () => {
  await mongoose.connection.close();
 });

});