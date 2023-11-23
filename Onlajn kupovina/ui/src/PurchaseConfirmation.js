import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const PotvrdaKupovine = ({ showModal, handleOpenModal, handleCloseModal, nazivProizvoda, cenaProizvoda, valutaProizvoda }) => {

  const [konvertovanaCena, podesiKonvertovanuCenu] = useState(null);
  const [kolicina, podesiKolicinu] = useState('');
  const [valute, postaviValute] = useState([]);
  const [valuta, postaviOdabranuValutu] = useState('');

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

  useEffect(() => {
    const dobaviValute = async () => {
      const odgovor = await axios.get('https://open.er-api.com/v6/latest');
      const valuteAPI = Object.keys(odgovor.data.rates);
      postaviValute(valuteAPI);
    };

    dobaviValute();
  }, []);

  const stilZaUnos = {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: 'blue',
    width: '100px',
    marginLeft: '10px',
  };

  const stilKontejnera = {
    marginBottom: '20px',
  };

  const stilListeValuta = {
    marginLeft: '10px',
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
        <Button variant="secondary" onClick={handleCloseModal}>
          Potvrdi naručbinu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotvrdaKupovine;