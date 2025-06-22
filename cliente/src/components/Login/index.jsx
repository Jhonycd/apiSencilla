import { useState } from 'react';
import styles from './Login.module.css';
import { iniciarSesion } from '../../services/authService';

const Login = () => {
 const [formulario, setFormulario] = useState({
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

  const resultado = await iniciarSesion(formulario);

  if (resultado.ok) {
   localStorage.setItem('token', resultado.token);
   setMensaje('✅ ' + resultado.mensaje);
   setFormulario({ email: '', contraseña: '' });
  } else {
   setMensaje('❌ ' + resultado.mensaje);
  }
 };

 return (
  <form onSubmit={handleSubmit} className={styles.form}>
   <h2>Iniciar sesión</h2>

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

   <button type="submit">Ingresar</button>

   {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
  </form>
 );
};

export default Login;