from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, supports_credentials=True)

# Obrada prijavljivanja
@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']

    
    app.logger.info(f"\nEmail: {email}\nLozinka: {lozinka}")

   
    response_data = {
        "message": "Podaci uspješno primljeni",
        "email": email,
        "lozinka": lozinka
    }

    
    return jsonify(response_data), 200

# Obrada registracije
@app.route('/Registracija', methods=['POST'])
def registracija():
    
    ime = request.json['ime']
    prezime = request.json['prezime']
    adresa = request.json['adresa']
    grad = request.json['grad']
    drzava = request.json['drzava']
    brojTelefona = request.json['brTel']
    email = request.json['email']
    lozinka = request.json['lozinka']

    
    app.logger.info(f"\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}")
    
    
    response_data = {
        "message": "Podaci uspješno primljeni",
        "email": email,
        "lozinka": lozinka,
        "ime": ime,
        "prezime": prezime,
        "adresa": adresa,
        "grad": grad,
        "drzava": drzava,
        "brojTelefona": brojTelefona
    }

    
    return jsonify(response_data), 200

# Dodavanje novog proizvoda od admina
@app.route('/Proizvod', methods=['POST'])
def dodavanjeProizvoda():

    
    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']

    
    app.logger.info(f"\nNaziv proivoda: {naziv}\ncena: {cena}\nvaluta: {valuta}\nkolicina {kolicina}")

    
    response_data = {
        "message": "Podaci uspješno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    
    return jsonify(response_data), 200

if __name__ == "__main__":
    app.run(debug=True)