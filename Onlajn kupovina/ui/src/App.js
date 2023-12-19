import './App.css';
import Prijava from './LogIn'
import Registracija from './Registration'
import DodajProizvod from './AddProduct';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Pocetna from './Home';
import IzmenaProfila from './ModifyProfile';
import UzivoPracenjeKupovina from './LivePurchaseTracking'
import IstorijatKupovina from './PurchasedProducts';
import DodavanjeKartice from './AddCard';
import PrikazRacuna from './StatusOnCard'
import IzmenaKolicine from './QuantityModification';
import UplataKonverzija from './PaymentConversion';
import Verifikacija from './Verification'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />} ></Route>
          <Route path="/Prijava" element={<Prijava />} ></Route>
          <Route path="/Registracija" element={<Registracija />} ></Route>
          <Route path="/Proizvod" element={<DodajProizvod />} ></Route>
          <Route path="/Profil" element={<IzmenaProfila />} ></Route>
          <Route path="/Uzivo" element={<UzivoPracenjeKupovina />} ></Route>
          <Route path="/Istorijat" element={<IstorijatKupovina />} ></Route>
          <Route path="/Kartica" element={<DodavanjeKartice />} ></Route>
          <Route path="/Pregled" element={<PrikazRacuna />} ></Route>
          <Route path="/IzmenaKolicine" element={<IzmenaKolicine />} ></Route>
          <Route path="/UplataKonverzija" element={<UplataKonverzija />} ></Route>
          <Route path="/Verifikacija" element={<Verifikacija />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;