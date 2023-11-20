import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Prijava = () => {

    const [email, podesiEmail] = useState('');
    const [lozinka, podesiLozinku] = useState('');

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '280px',
        height: '180px'
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
        fontFamily: 'Times New Roman',
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
        backgroundImage: `url('Pozadine/pozadinaPiR.jpg')`,
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

    const prijavaKorisnika = () => {
        if (email.length === 0) {
            alert("Email mora biti popunjen !!")
        }
        else if (lozinka.length === 0) {
            alert("Lozinka mora biti popunjena !!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Prijava', {
                email: email,
                lozinka: lozinka
            })
            alert("Prijava je uspešna !!")
        }
    }

    return (
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Prijava" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            <div className='prijava'>
                <div className="kontejner" style={stilKontejnera}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Prijavljivanje</h1>
                        <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                            <tr>
                                <th style={stilZaLabelu}>Email:</th>
                                <td>
                                    <input
                                        style={stilZaUnos}
                                        type="email"
                                        id="email"
                                        className="email"
                                        maxLength="25"
                                        value={email}
                                        onChange={(e) => podesiEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilZaLabelu}>Lozinka:</th>
                                <td>
                                    <input
                                        style={stilZaUnos}
                                        type="password"
                                        id="lozinka"
                                        className="lozinka"
                                        maxLength="18"
                                        value={lozinka}
                                        onChange={(e) => podesiLozinku(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <input
                                        className="btn btn-outline-primary"
                                        id="prijavaDugme"
                                        style={stilZaDugme}
                                        type="submit"
                                        value="Prijava"
                                        onClick={prijavaKorisnika}
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

export default Prijava;