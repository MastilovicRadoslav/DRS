import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrikazRacuna = () => {

    const [brojKartice, postaviBrojKartice] = useState('');
    const [datumIsteka, postaviDatumIsteka] = useState('');
    const [stanje, postaviStanje] = useState('');
    const [valuta, postaviValutu] = useState('');
    const [podaci, podesiPodatke] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/Pregled');
                podesiPodatke(odgovor.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        fetchData();
    }, []);

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '350px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const stilForme = {
        textAlign: 'left',
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block',
    };

    const stilZaUnos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '20px',
        color: '#007BFF',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaRacun.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }

    useEffect(() => {
        postaviBrojKartice(podaci.brojKartice || '');
        postaviDatumIsteka(podaci.datumIsteka || '');
        postaviStanje(podaci.stanje || '');
        postaviValutu(podaci.valuta || '');
    }, [podaci]);
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
                        <Link to="/Pregled" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Istorijat" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilKontejnera}>
                <h2 style={stilNaslova}>Stanje na računu</h2>
                <form style={stilForme}>
                    <label style={stilZaLabelu} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="brojKartice"
                        maxLength={16}
                        value={brojKartice}
                    />

                    <label style={stilZaLabelu} htmlFor="datumIsteka">
                        Datum isteka:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="datumIsteka"
                        maxLength={5}
                        value={datumIsteka}
                    />

                    <label style={stilZaLabelu} htmlFor="stanje">
                        Stanje:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="stanje"
                        value={stanje}
                    />

                    <label style={stilZaLabelu} htmlFor="valuta">
                        Valuta:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="valuta"
                        maxLength={3}
                        value={valuta}
                    />
                </form>
            </div>
        </div>
    );
};

export default PrikazRacuna;
