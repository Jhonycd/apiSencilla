import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

const api = request(app);

beforeAll(async () => {
 try {
  await mongoose.connect(process.env.MONGO_URI);
 } catch (error) {
  console.error('❌ Error al conectar a MongoDB en tests:', error.message);
 }
});

afterAll(async () => {
 await mongoose.connection.close();
});

describe('Validaciones de usuario', () => {
 test('Rechaza registro con email inválido', async () => {
  const invalidUser = {
   nombre: 'Test User',
   email: 'invalid-email',
   contraseña: 'password123'
  };

  const res = await api.post('/api/auth/registro').send(invalidUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.mensaje).toBeDefined();
 });

 test('Rechaza registro con contraseña corta', async () => {
  const shortPassUser = {
   nombre: 'Test User',
   email: 'test-short@example.com',
   contraseña: '123'
  };

  const res = await api.post('/api/auth/registro').send(shortPassUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.mensaje).toBeDefined();
 });

 test('Rechaza registro sin nombre', async () => {
  const noNameUser = {
   email: 'test-noname@example.com',
   contraseña: 'password123'
  };

  const res = await api.post('/api/auth/registro').send(noNameUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.mensaje).toBeDefined();
 });

 test('Rechaza registro con email duplicado', async () => {
  const duplicateUser = {
   nombre: 'Test User',
   email: 'tester@example.com', // mismo que en test anterior
   contraseña: 'password123'
  };

  const res = await api.post('/api/auth/registro').send(duplicateUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.mensaje).toMatch(/ya está registrado/i);
 });
});