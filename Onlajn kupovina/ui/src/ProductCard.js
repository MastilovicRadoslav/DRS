import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrikazProizvoda = ({ proizvod }) => {
    const stilKartice = {
        width: '18rem',
    };

    const stilSlike = {
        width: '100%',
    };

    return (
        <div className="card" style={stilKartice}>
            <img src={proizvod.slikaUrl} className="card-img-top" alt={proizvod.naziv} style={stilSlike} />
            <div className="card-body">
                <h5 className="card-title">{proizvod.naziv}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cena: {proizvod.cena} {proizvod.valuta}</li>
                <li className="list-group-item">Količina: {proizvod.kolicina}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary">Naruči</button>
                </li>
            </ul>
        </div>
    );
};

export default PrikazProizvoda;