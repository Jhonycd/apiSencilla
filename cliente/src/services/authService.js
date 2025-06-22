const API_URL = 'http://localhost:3000/api/auth';
 
export const registrarUsuario = async (datos) => {
 try {
  const res = await fetch(`${API_URL}/registro`, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(datos)
  });

  const data = await res.json();

  return {
   ok: res.ok,
   mensaje: data.mensaje || data.error || 'Algo salió mal'
  };
 } catch (error) {
  console.error('❌ Error al registrar usuario:', error.message);
  return {
   ok: false,
   mensaje: 'Error de red o del servidor'
  };
 }
};

export const iniciarSesion = async (credenciales) => {
 try {
  const res = await fetch(`${API_URL}/login`, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(credenciales)
  });

  const data = await res.json();

  return {
   ok: res.ok,
   mensaje: data.mensaje || data.error || 'Error al iniciar sesión',
   token: data.token || null
  };
 } catch (error) {
  console.error('❌ Error al iniciar sesión:', error.message);
  return {
   ok: false,
   mensaje: 'Error de red o del servidor',
   token: null
  };
 }
};