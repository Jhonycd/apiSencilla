import { useState } from 'react';
import styles from './Registro.module.css';
import { registrarUsuario } from '../../services/authService';

const Registro = () => {
 const [formulario, setFormulario] = useState({
  nombre: '',
  email: '',
  contraseña: ''
 });

 const [mensaje, setMensaje] = useState('');

 const handleChange = (e) => {
  setFormulario({
   ...formulario,
   [e.target.name]: e.target.value
  });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMensaje('');

  const { ok, mensaje } = await registrarUsuario(formulario);

  setMensaje((ok ? '✅ ' : '❌ ') + mensaje);

  if (ok) {
   setFormulario({ nombre: '', email: '', contraseña: '' });
  }
 };

 return (
  <form onSubmit={handleSubmit} className={styles.form}>
   <h2>Registro</h2>

   <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    value={formulario.nombre}
    onChange={handleChange}
    required
   />
   <input
    type="email"
    name="email"
    placeholder="Correo electrónico"
    value={formulario.email}
    onChange={handleChange}
    required
   />
   <input
    type="password"
    name="contraseña"
    placeholder="Contraseña"
    value={formulario.contraseña}
    onChange={handleChange}
    required
   />
   <button type="submit">Registrarse</button>

   {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
  </form>
 );
};

export default Registro;