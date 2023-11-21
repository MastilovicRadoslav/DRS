import './App.css';
import Prijava from './LogIn'
import Registracija from './Registration'
import DodajProizvod from './AddProduct';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Pocetna from './Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />} ></Route>
          <Route path="/Prijava" element={<Prijava />} ></Route>
          <Route path="/Registracija" element={<Registracija />} ></Route>
          <Route path="/Proizvod" element={<DodajProizvod />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;