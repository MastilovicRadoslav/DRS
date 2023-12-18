import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UplataKonverzija = () => {

    const [email, postaviEmail] = useState('');
    const [brojKartice, postaviBrojKartice] = useState('');
    const [iznos, postaviIznos] = useState('');
    const [valute1, postaviValute1] = useState([]);
    const [valute2, postaviValute2] = useState([]);
    const [valuta1, postaviOdabranuValutu1] = useState('');
    const [valuta2, postaviOdabranuValutu2] = useState('');
    const [pomocnaValuta, postaviPomocnuValutu] = useState([]);
    const [pocetnaValuta, postaviPocetnuValutu] = useState([]);
    const [stanje, postaviStanje] = useState('');
    const [pocetnoStanje, postaviPocetnoStanje] = useState('');
    const [podaci, podesiPodatke] = useState([]);

    const stilKontejnera1 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '430px'
    };

    const stilKontejnera2 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        marginLeft: '100px',
        height: '430px'
    };

    const stilForme = {
        textAlign: 'left',
        width: '400px',
        margin: '0 auto',
        marginBottom: '20px'
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block'
    };

    const stilZaUnos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
        width: '80%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const stilZaDugme1 = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '80px',
        marginTop: '5px'
    };

    const stilZaDugme2 = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '95px',
        marginTop: '5px'
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '20px',
        color: '#007BFF',
        marginLeft: '85px'
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaUplataKonverzija.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000
    }

    // Prijem podataka sa servera o kartici
    useEffect(() => {
        const fetchData = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/UplataKonverzija');
                podesiPodatke(odgovor.data.kartica);
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        fetchData();
    }, []);

    console.log(podaci.vlasnik)

    // Podešavanje vrednosti promenljivih za prikaz na stranici
    useEffect(() => {
        if (podaci !== undefined && podaci.vlasnik !== undefined) {
            postaviEmail(podaci.vlasnik);
            postaviBrojKartice(podaci.brojKartice);
            postaviStanje(podaci.stanjeNaRacunu);
            postaviOdabranuValutu2(podaci.valuta);
            postaviPomocnuValutu(podaci.valuta);
            postaviPocetnuValutu(podaci.valuta);
            postaviPocetnoStanje(podaci.stanjeNaRacunu);
        }
    }, [podaci]);

    // Pribavljanje svih valuta koje postoje
    useEffect(() => {
        const dobaviValute = async () => {
            const odgovor = await axios.get('https://open.er-api.com/v6/latest');
            const valuteAPI = Object.keys(odgovor.data.rates);
            postaviValute1(valuteAPI);
            postaviValute2(valuteAPI);
        };

        dobaviValute();
    }, []);

    // Slanje podataka na server, ako je korisnik uplatio na račun
    const uplati = () => {
        axios.put('http://127.0.0.1:5000/Uplata', {
            email: email,
            brojKartice: brojKartice,
            iznos: iznos,
            valuta: valuta1
        });
        alert('Uplata je uspešna !!');
        window.location.reload();
    };

    // Slanje podataka na server, ako je korisnik konvertovao stanje na računu
    const konvertuj = () => {
        axios.put('http://127.0.0.1:5000/Konverzija', {
            email: email,
            brojKartice: brojKartice,
            stanje: stanje,
            valuta: valuta2
        });
        alert('Konverzija je uspešna !!');
    };

    // Konverzija stanja za odabranu valutu po trenutnom kursu
    useEffect(() => {
        const konverzijaStanja = async () => {
            try {
                const odgovor = await fetch(`https://open.er-api.com/v6/latest/${valuta2}`);
                const data = await odgovor.json();

                if (valuta2 === pocetnaValuta) {
                    postaviStanje(pocetnoStanje);
                }
                else {
                    const konvertovanoStanje = (data.rates[valuta2] / data.rates[pomocnaValuta]) * stanje;
                    postaviStanje(konvertovanoStanje.toFixed(2));
                }
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        if (valuta2 !== '') {
            konverzijaStanja();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valuta2, pomocnaValuta]);

    // Podečavanje vrednosti za valutu i pomoćnu valutu (prethodna vrednost)
    const podesavanjeValuta = (e) => {
        const novaVrednost = e.target.value;
        postaviPomocnuValutu(valuta2);
        postaviOdabranuValutu2(novaVrednost);
    };

    return (
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kartica" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Dodavanje kartice</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Pregled" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UplataKonverzija" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Istorijat" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilKontejnera1}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Uplata na račun</h2>
                    <label style={stilZaLabelu} htmlFor="email">
                        Email:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="email"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilZaLabelu} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="brojKartice"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilZaLabelu} htmlFor="iznos">
                        Iznos:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilZaUnos}
                            type="number"
                            id="iznos"
                            value={iznos}
                            onChange={(e) => postaviIznos(e.target.value)}
                        />
                        <select
                            value={valuta1}
                            onChange={(e) => postaviOdabranuValutu1(e.target.value)}
                            style={{ ...stilZaUnos, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute1.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-primary"
                        id="uplati"
                        style={stilZaDugme1}
                        type="button"
                        value="Uplati"
                        onClick={uplati}
                    />
                </form>
            </div>
            <div style={stilKontejnera2}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Konverzija stanja</h2>
                    <label style={stilZaLabelu} htmlFor="email2">
                        Email:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="email2"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilZaLabelu} htmlFor="brojKartice2">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="brojKartice2"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilZaLabelu} htmlFor="stanje">
                        Stanje:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilZaUnos}
                            type="text"
                            id="stanje"
                            readOnly={true}
                            value={stanje}
                            onChange={(e) => postaviStanje(e.target.value)}
                        />
                        <select
                            value={valuta2}
                            onChange={podesavanjeValuta}
                            style={{ ...stilZaUnos, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute2.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-primary"
                        id="konvertuj"
                        style={stilZaDugme2}
                        type="button"
                        value="Konvertuj"
                        onClick={konvertuj}
                    />
                </form>
            </div>
        </div>
    );
};

export default UplataKonverzija;