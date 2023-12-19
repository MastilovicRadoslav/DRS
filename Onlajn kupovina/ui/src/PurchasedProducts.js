import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IstorijatKupovina = () => {

    const [podaci, podesiPodatke] = useState([]);

    // Funkcija za prijem podataka o kupljenim proizvodima sa servera
    useEffect(() => {
        const fetchData = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/Istorijat');
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
        borderRadius: '8px'
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left'
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
        color: '#007BFF'
    };

    const stilTabele = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd'
    };

    const stilZaglavlja = {
        border: '3px solid #ddd',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: 'blue',
        color: 'white'
    };

    const stilRedaUTabeli = {
        border: '3px solid #ddd',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: '#bfc1c2',
        fontWeight: 'bold'
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/uzivoPracenjeKupovina.jpg')`,
        backgroundSize: 'cover',
        height: '115vh',
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

    const stilSlike = {
        width: '80px',
        height: 'auto%'
    }

    return (
        <div style={stilCeleStranice} >
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
                        <Link to="/UplataKonverzija" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Istorijat" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div className='uzivoPracenjeKupovina'>
                <div className="kontejner" style={stilKontejnera}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Kupljeni proizvodi</h1>
                        <table style={stilTabele}>
                            <thead>
                                <tr>
                                    <th style={stilZaglavlja}>Slika proizvoda</th>
                                    <th style={stilZaglavlja}>Naziv proizvoda</th>
                                    <th style={stilZaglavlja}>Cena</th>
                                    <th style={stilZaglavlja}>Valuta</th>
                                    <th style={stilZaglavlja}>Količina</th>
                                    <th style={stilZaglavlja}>Vreme kupovine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podaci.map((item, index) => (
                                    <tr key={index}>
                                        <td style={stilRedaUTabeli}>
                                            <img style={stilSlike} src={item.slika} alt="" />
                                        </td>
                                        <td style={stilRedaUTabeli}>{item.nazivProizvoda}</td>
                                        <td style={stilRedaUTabeli}>{item.cena}</td>
                                        <td style={stilRedaUTabeli}>{item.valuta}</td>
                                        <td style={stilRedaUTabeli}>{item.kolicina}</td>
                                        <td style={stilRedaUTabeli}>{item.vreme}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IstorijatKupovina;