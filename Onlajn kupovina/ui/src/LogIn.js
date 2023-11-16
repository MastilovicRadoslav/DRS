import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Prijava = () => {
    const stilkontejnera = {
        textAlign: 'center',
        backgroundColor: 'white'
    };

    const stilforme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const Stillabel = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
    };

    const stilzaunos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
    };

    const stilzadugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    };

    const stilnaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
    };

    const stilcelestranice = {
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={stilcelestranice} >
            <div className='Prijava'>
                <div className="kontejner" style={stilkontejnera}>
                    <div className="forma" style={stilforme}>
                        <h1 style={stilnaslova}>Prijavljivanje</h1>
                        <table style={{ margin: 'auto' }}>
                            <tr>
                                <th style={Stillabel}>Email:</th>
                                <td>
                                    <input
                                        style={stilzaunos}
                                        type="email"
                                        id="email"
                                        name="email"
                                        maxLength="25"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={Stillabel}>Lozinka:</th>
                                <td>
                                    <input
                                        style={stilzaunos}
                                        type="password"
                                        id="lozinka"
                                        name="lozinka"
                                        maxLength="18"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <input
                                        className="btn btn-outline-primary"
                                        id="prijavaDugme"
                                        style={stilzadugme}
                                        type="submit"
                                        value="Prijava"
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