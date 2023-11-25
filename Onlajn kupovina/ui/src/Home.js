import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PrikazProizvoda from './ProductCard'
import axios from 'axios';

const Pocetna = () => {

    const [data, setData] = useState([]);

    const stilKontejneraZaKartice = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '15px',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
        paddingTop: '55px',
        overflowY: 'auto',
        minHeight: '100vh',
        flexDirection: 'column',
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setData(response.data);
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='pocetnaStranica' style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" style={{ color: 'black', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Prijava" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            <div className="kontejner" style={stilKontejneraZaKartice}>
                {data.map((proizvod, index) => (
                    <PrikazProizvoda key={index} proizvod={proizvod} />
                ))}
            </div>
        </div>
    );
}

export default Pocetna;