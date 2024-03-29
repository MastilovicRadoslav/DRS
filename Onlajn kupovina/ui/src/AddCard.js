import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DodavanjeKartice = () => {

    const [brojKartice, postaviBrojKartice] = useState('');
    const [datumIsteka, postaviDatumIsteka] = useState('');
    const [cvv, postaviCVV] = useState('');

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '350px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    };

    const stilForme = {
        textAlign: 'left'
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
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const stilZaDugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        marginLeft: '50px'
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '20px',
        color: '#007BFF'
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaDKiV.jpg')`,
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

    // Funkcija za validaciju polja i slanje podataka o kartici na server
    const dodajKarticu = () => {
        if (!brojKartice || !datumIsteka || !cvv) {
            alert('Molimo vas da popunite sva polja kartice !!');
        } else if (!/^[0-9]{16}$/.test(brojKartice)) {
            alert('Neispravan format broja kartice. Molimo vas unesite 16 brojeva !!');
        } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(datumIsteka)) {
            alert('Neispravan format datuma isteka. Molimo vas unesite u formatu MM/YY !!');
        } else if (!/^[0-9]{3}$/.test(cvv)) {
            alert('Neispravan format CVV. Molimo vas unesite 3 broja !!');
        } else {
            axios
                .post('http://127.0.0.1:5000/Kartica', {
                    brojKartice: brojKartice,
                    datumIsteka: datumIsteka,
                    cvv: cvv,
                })
            alert('Kartica je dodata. Sačekajte verifikaciju admina !!');
        }
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
                        <Link to="/Kartica" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Dodavanje kartice</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Pregled" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UplataKonverzija" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Istorijat" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilKontejnera}>
                <h2 style={stilNaslova}>Dodavanje kartice</h2>
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
                        onChange={(e) => postaviBrojKartice(e.target.value)}
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
                        onChange={(e) => postaviDatumIsteka(e.target.value)}
                    />
                    <label style={stilZaLabelu} htmlFor="cvv">
                        CVV:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="password"
                        id="cvv"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => postaviCVV(e.target.value)}
                    />
                    <input
                        className="btn btn-outline-primary"
                        id="prijavaDugme"
                        style={stilZaDugme}
                        type="button"
                        value="Dodaj karticu"
                        onClick={dodajKarticu}
                    />
                </form>
            </div>
        </div>
    );
};

export default DodavanjeKartice;