import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const PotvrdaKupovine = ({ showModal, handleOpenModal, handleCloseModal, nazivProizvoda, cenaProizvoda, valutaProizvoda, kartica }) => {

  const [konvertovanaCena, podesiKonvertovanuCenu] = useState(null);
  const [kolicina, podesiKolicinu] = useState('');
  const [valute, postaviValute] = useState([]);
  const [valuta, postaviOdabranuValutu] = useState('');
  const [stanje, postaviStanje] = useState('');
  const [stanje2, postaviStanje2] = useState('');
  const [zaradaAdmina, postaviZaradu] = useState('');

  // Funkcija za konverziju cene u odabranu valutu po trenutnom kursu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${valuta}`);
        const data = await response.json();
        const konvertovanaCena = (data.rates[valuta] / data.rates[valutaProizvoda]) * cenaProizvoda;
        podesiKonvertovanuCenu(konvertovanaCena.toFixed(2));
      } catch (error) {
        console.error('Greška:', error);
      }
    };

    if (showModal) {
      fetchData();
    }
  }, [showModal, cenaProizvoda, valutaProizvoda, valuta]);

  // Funkcija za dobavljanje svih postojećih valuta
  useEffect(() => {
    const dobaviValute = async () => {
      const odgovor = await axios.get('https://open.er-api.com/v6/latest');
      const valuteAPI = Object.keys(odgovor.data.rates);
      postaviValute(valuteAPI);
    };

    dobaviValute();
  }, []);

  // Funkcija za konverziju stanja za odabranu valutu po trenutnom kursu
  useEffect(() => {
    const konverzijaStanja = async () => {
      try {
        const odgovor = await fetch(`https://open.er-api.com/v6/latest/${valuta}`);
        const data = await odgovor.json();
        const konvertovanoStanje = (data.rates[valuta] / data.rates[kartica.valuta]) * kartica.stanjeNaRacunu;
        postaviStanje(konvertovanoStanje.toFixed(2));
        const konvertovanoStanje2 = (data.rates['USD'] / data.rates[valuta]) * (kolicina * konvertovanaCena);
        postaviZaradu(konvertovanoStanje2.toFixed(2));
        const konvertovanoStanje3 = (data.rates[kartica.valuta] / data.rates[valuta]) * konvertovanaCena;
        postaviStanje2(konvertovanoStanje3.toFixed(2));
      } catch (error) {
        console.error('Greška:', error);
      }
    };

    if (valuta !== '') {
      konverzijaStanja();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuta, kolicina]);

  const stilZaUnos = {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: 'blue',
    width: '100px',
    marginLeft: '10px'
  };

  const stilKontejnera = {
    marginBottom: '20px'
  };

  const stilListeValuta = {
    marginLeft: '10px'
  };

  // Funkcija za slanje podataka o kupovini na server
  const poruciProizvod = () => {
    if (kartica.valuta === valuta) {
      if (kartica.stanjeNaRacunu >= (kolicina * konvertovanaCena)) {
        axios.post('http://127.0.0.1:5000/Naruci', {
          nazivProizvoda: nazivProizvoda,
          cena: konvertovanaCena,
          valuta: valuta,
          kolicina: kolicina,
          zaradaAdmina: zaradaAdmina
        })
        alert("Uspešno ste naručili proizvod !!");
        window.location.reload();
      }
      else {
        alert("Nemate dovoljno novca da naručite proizvod !!");
      }
    }
    else {
      if (stanje >= (kolicina * konvertovanaCena)) {
        axios.post('http://127.0.0.1:5000/Naruci', {
          nazivProizvoda: nazivProizvoda,
          cena: stanje2,
          valuta: valuta,
          kolicina: kolicina,
          zaradaAdmina: zaradaAdmina
        })
        alert("Uspešno ste naručili proizvod !!");
        window.location.reload();
      }
      else {
        alert("Nemate dovoljno novca da naručite proizvod !!");
      }
    }
  }

  // Funkcija za klik na naruči dugme
  const klikNaNaruci = () => {
    poruciProizvod();
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{nazivProizvoda}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={stilKontejnera}>
          <span>Odaberite valutu u kojoj želite da platite :</span>
          <select style={stilListeValuta} value={valuta} onChange={(e) => postaviOdabranuValutu(e.target.value)}>
            {valute.map((valuta, index) => (
              <option key={index} value={valuta}>
                {valuta}
              </option>
            ))}
          </select>
        </div>
        <div style={stilKontejnera}>
          Cena proizvoda za odabranu valutu je : {konvertovanaCena} {valuta}
        </div>
        <div>
          <span>Koliko artikala naručujete:</span>
          <input
            style={stilZaUnos}
            type="number"
            value={kolicina}
            onChange={(e) => podesiKolicinu(e.target.value)}
            id="kolicina"
            name="kolicina"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={klikNaNaruci}>
          Potvrdi naručbinu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotvrdaKupovine;