import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
 return (
  <BrowserRouter>
   <NavBar />
   <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />
   </Routes>
  </BrowserRouter>
 );
}

export default App;