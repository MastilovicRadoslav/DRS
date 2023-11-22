import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const IzmenaProfila = () => {

    const [ime, podesiIme] = useState('');
    const [prezime, podesiPrezime] = useState('');
    const [adresa, podesiAdresu] = useState('');
    const [grad, podesiGrad] = useState('');
    const [drzava, podesiDrzavu] = useState('');
    const [brTel, podesiBrTel] = useState('');
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
        backgroundImage: `url('Pozadine/profil.jpg')`,
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

    const sacuvajIzmene = () => {
        if (ime.length === 0) {
            alert("Ime mora biti popunjeno !!")
        }
        else if (prezime.length === 0) {
            alert("Prezime mora biti popunjeno !!")
        }
        else if (adresa.length === 0) {
            alert("Adresa mora biti popunjena !!")
        }
        else if (grad.length === 0) {
            alert("Grad mora biti popunjen !!")
        }
        else if (drzava.length === 0) {
            alert("Država mora biti popunjena !!")
        }
        else if (brTel.length === 0) {
            alert("Broj telefona mora biti popunjen !!")
        }
        else if (email.length === 0) {
            alert("Email mora biti popunjen !!")
        }
        else if (lozinka.length === 0) {
            alert("Lozinka mora biti popunjena !!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Profil', {
                ime: ime,
                prezime: prezime,
                adresa: adresa,
                grad: grad,
                drzava: drzava,
                brTel: brTel,
                email: email,
                lozinka: lozinka
            })
            alert("Izmena profila je uspešna !!")
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
                        <Link to="/Prijava" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            <div className="kontejner" style={stilKontejnera}>
                <div className="forma" style={stilForme}>
                    <h1 style={stilNaslova}>Registracija</h1>
                    <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                        <tr>
                            <td style={stilZaLabelu}>Ime:</td>
                            <td><input style={stilZaUnos} value={ime} type="text" id="ime" className="ime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Prezime:</td>
                            <td><input style={stilZaUnos} value={prezime} type="text" id="prezime" className="prezime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Adresa:</td>
                            <td><input style={stilZaUnos} value={adresa} type="text" id="adresa" className="adresa" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Grad:</td>
                            <td><input style={stilZaUnos} value={grad} type="text" id="grad" className="grad" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Država:</td>
                            <td><input style={stilZaUnos} value={drzava} type="text" id="drzava" className="drzava" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Broj telefona:</td>
                            <td><input style={stilZaUnos} value={brTel} type="text" id="brtelefona" className="brtelefona" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Email:</td>
                            <td><input style={stilZaUnos} value={email} type="email" id="email" className="email" maxLength="30" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Lozinka:</td>
                            <td><input style={stilZaUnos} value={lozinka} type="password" id="lozinka" className="lozinka" maxLength="18" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <input
                                    className="btn btn-outline-primary"
                                    id="registracijaDugme"
                                    style={stilZaDugme}
                                    type="submit"
                                    value="Sačuvaj izmene"
                                    onClick={sacuvajIzmene}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default IzmenaProfila;