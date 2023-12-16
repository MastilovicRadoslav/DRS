import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const KarticeZaVerifikaciju = ({ kartica }) => {

    const stilKartice = {
        width: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        margin: '20px',
        transition: 'transform 0.3s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '0',
        color: '#007BFF',
        fontSize: '30px',
        borderBottom: '3px solid #007BFF',
        padding: '10px',
        marginLeft: '15px',
        width: 'fit-content'
    };

    const stil = {
        fontWeight: 'bold',
        marginRight: '10px',
        marginLeft: '0'
    };

    const stilZaDugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '55px',
        marginTop: '5px'
    };

    // Slanje podataka na server, da je kartica odobrena
    const verifikujKarticu = () => {
        axios.put('http://127.0.0.1:5000/Verifikacija', {
            email: kartica.vlasnik,
            brojKartice: kartica.brojKartice,
            odobrena: 'Da'
        })
        alert("Odobrili ste karticu !!")
    }

    return (
        <div className="card" style={stilKartice}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item" style={stilNaslova}>Potvrda verifikacije</li>
                <li className="list-group-item"><span style={stil}>Email:</span> {kartica.vlasnik}</li>
                <li className="list-group-item"><span style={stil}>Broj kartice:</span> {kartica.brojKartice}</li>
                <li className="list-group-item"><span style={stil}>Datum isteka:</span> {kartica.datumIsteka}</li>
                <li className="list-group-item"><span style={stil}>CVV:</span> {kartica.ccv}</li>
                <li className="list-group-item"><span style={stil}>Stanje:</span> {kartica.stanjeNaRacunu}</li>
                <li className="list-group-item"><span style={stil}>Valuta:</span> {kartica.valuta}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary" style={stilZaDugme} onClick={verifikujKarticu}>Verifikuj karticu</button>
                </li>
            </ul>
        </div>
    );
};

export default KarticeZaVerifikaciju;