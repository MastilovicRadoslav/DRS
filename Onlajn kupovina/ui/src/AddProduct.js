import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DodajProizvod = () => {

    const [naziv, podesiNaziv] = useState('');
    const [cena, podesiCenu] = useState('');
    const [kolicina, podesiKolicinu] = useState('');
    const [valute, postaviValute] = useState([]);
    const [valuta, postaviOdabranuValutu] = useState('');
    const [slika, podesiSliku] = useState('');
    const redirekcija = useNavigate();

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        marginLeft: '950px',
        width: '370px',
        height: '260px'
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
    };

    const stilZaUnos = {
        fontFamily: 'Arial',
        color: 'blue',
    };

    const stilZaDugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/proizvodi.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
    };

    useEffect(() => {
        const dobaviValute = async () => {
            const odgovor = await axios.get('https://open.er-api.com/v6/latest');
            const valuteAPI = Object.keys(odgovor.data.rates);
            postaviValute(valuteAPI);
        };

        dobaviValute();
    }, []);

    const dodavanjeProizvoda = () => {
        if (naziv.length === 0) {
            alert("Naziv proizvoda mora biti popunjen !!")
        }
        else if (cena.length === 0) {
            alert("Cena proizvoda mora biti popunjena !!")
        }
        else if (kolicina.length === 0) {
            alert("Količina proizvoda mora biti popunjena !!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Proizvod', {
                naziv: naziv,
                cena: cena,
                valuta: valuta,
                kolicina: kolicina,
                slika: slika
            })
            alert("Uspešno ste dodali proizvod !!")
            redirekcija('/');
        }
    }

    return (
        <div style={stilCeleStranice}>
            <div className='proizvod'>
                <div className="kontejner" style={stilKontejnera}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Proizvod</h1>
                        <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                            <tr>
                                <th style={stilZaLabelu}>Naziv:</th>
                                <td>
                                    <input
                                        style={stilZaUnos}
                                        type="text"
                                        id="naziv"
                                        className="naziv"
                                        value={naziv}
                                        onChange={(e) => podesiNaziv(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilZaLabelu}>Cena:</th>
                                <td>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <input
                                            style={stilZaUnos}
                                            type="number"
                                            id="cena"
                                            className="cena"
                                            value={cena}
                                            onChange={(e) => podesiCenu(e.target.value)}
                                        />
                                        <select value={valuta} onChange={(e) => postaviOdabranuValutu(e.target.value)}>
                                            {valute.map((valuta, index) => (
                                                <option key={index} value={valuta}>
                                                    {valuta}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th style={stilZaLabelu}>Količina:</th>
                                <td>
                                    <input
                                        style={stilZaUnos}
                                        type="number"
                                        id="kolicina"
                                        className="kolicina"
                                        value={kolicina}
                                        onChange={(e) => podesiKolicinu(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilZaLabelu}>Slika:</th>
                                <td>
                                    <td>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            value={slika}
                                            onChange={(e) => podesiSliku(e.target.value)}
                                        />
                                    </td>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <input
                                        className="btn btn-outline-primary"
                                        id="dodajDugme"
                                        style={stilZaDugme}
                                        type="submit"
                                        value="Dodaj"
                                        onClick={dodavanjeProizvoda}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DodajProizvod;