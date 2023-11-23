import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const UzivoPracenjeKupovina = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Uzivo');
                setData(response.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        fetchData();
    }, []);

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white'
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
    };

    const stilTabele = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
    };

    const stilZaglavlja = {
        border: '1px solid #ddd',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: 'blue',
        color: 'white',
    };

    const stilRedaUTabeli = {
        border: '1px solid #ddd',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: '#ecf0f1',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('/.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={stilCeleStranice} >
            <div className='uzivoPracenjeKupovina'>
                <div className="kontejner" style={stilKontejnera}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Praćenje kupovina uživo</h1>
                        <table style={stilTabele}>
                            <thead>
                                <tr>
                                    <th style={stilZaglavlja}>Naziv proizvoda</th>
                                    <th style={stilZaglavlja}>Cena</th>
                                    <th style={stilZaglavlja}>Valuta</th>
                                    <th style={stilZaglavlja}>Kupac (email)</th>
                                    <th style={stilZaglavlja}>Vreme kupovine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td style={stilRedaUTabeli}>{item.nazivProizvoda}</td>
                                        <td style={stilRedaUTabeli}>{item.cena}</td>
                                        <td style={stilRedaUTabeli}>{item.valuta}</td>
                                        <td style={stilRedaUTabeli}>{item.kupac}</td>
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

export default UzivoPracenjeKupovina;