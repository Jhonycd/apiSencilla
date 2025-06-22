import request from 'supertest';
import mongoose from 'mongoose';
import app from '../index.js';

const api = request(app);

describe('Validaciones de usuario', () => {

 test('Rechaza registro con email inválido', async () => {
  const invalidUser = {
   nombre: 'Test User',
   email: 'invalid-email',
   contraseña: 'password123'
  };

  const res = await api
   .post('/api/auth/registro')
   .send(invalidUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
 });

 test('Rechaza registro con contraseña corta', async () => {
  const shortPassUser = {
   nombre: 'Test User',
   email: 'test@example.com',
   contraseña: '123'
  };

  const res = await api
   .post('/api/auth/registro')
   .send(shortPassUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
 });

 test('Rechaza registro sin nombre', async () => {
  const noNameUser = {
   email: 'test@example.com',
   contraseña: 'password123'
  };

  const res = await api
   .post('/api/auth/registro')
   .send(noNameUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeDefined();
 });

 test('Rechaza registro con email duplicado', async () => {
  const duplicateUser = {
   nombre: 'Test User',
   email: 'tester@example.com',
   contraseña: 'password123'
  };

  const res = await api
   .post('/api/auth/registro')
   .send(duplicateUser);

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/email ya existe/i);
 });

});
