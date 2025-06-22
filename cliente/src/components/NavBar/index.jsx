import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
 const navigate = useNavigate();
 const autenticado = !!localStorage.getItem('token');

 const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
 };

 return (
  <nav className={styles.nav}>
   <ul>
    <li><Link to="/registro">Registro</Link></li>
    <li><Link to="/login">Login</Link></li>
    {autenticado && (
     <li>
      <button onClick={handleLogout} className={styles.logout}>
       Cerrar sesión
      </button>
     </li>
    )}
   </ul>
  </nav>
 );
};

export default NavBar;