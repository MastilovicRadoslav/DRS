import React from 'react';

const RegistrationForm = () => {
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
        <div style={stilcelestranice}>
            <div className="kontejner" style={stilkontejnera}>
                <div className="forma" style={stilforme}>
                    <h1 style={stilnaslova}>Registracija</h1>
                    <table>
                        <tr>
                            <td style={Stillabel}>Ime:</td>
                            <td><input style={stilzaunos} type="text" id="ime" name="ime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Prezime:</td>
                            <td><input style={stilzaunos} type="text" id="prezime" name="prezime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Adresa:</td>
                            <td><input style={stilzaunos} type="text" id="adresa" name="adresa" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Grad:</td>
                            <td><input style={stilzaunos} type="text" id="grad" name="grad" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Država:</td>
                            <td><input style={stilzaunos} type="text" id="drzava" name="drzava" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Broj telefona:</td>
                            <td><input style={stilzaunos} type="text" id="brtelefona" name="brtelefona" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Email:</td>
                            <td><input style={stilzaunos} type="email" id="email" name="email" maxLength="30" /></td>
                        </tr>
                        <tr>
                            <td style={Stillabel}>Lozinka:</td>
                            <td><input style={stilzaunos} type="password" id="lozinka" name="lozinka" maxLength="18" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <input
                                    className="btn btn-outline-primary"
                                    id="registracijaDugme"
                                    style={stilzadugme}
                                    type="submit"
                                    value="Registracija"
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;