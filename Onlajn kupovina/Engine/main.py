from flask import Flask, request, jsonify
from flask_cors import CORS
from notificationBy_Email import posalji_email
from Product import Proizvod
from User import Korisnik
from convert_image_path import zamenaPutanje

app = Flask(__name__)

CORS(app, supports_credentials=True)

proizvodi = [
    Proizvod(
        naziv= 'Laptop - ASUS ROG Strix G17',
        cena= 222000,
        valuta= 'RSD',
        kolicina= 5,
        slika= 'Prozivodi/laptop.jpg'
    ),
    Proizvod(
        naziv= 'Grafička kartica - NVIDIA GeForce RTX 3080', 
        cena= 85657, 
        valuta= 'RSD',
        kolicina= 2, 
        slika= 'Prozivodi/graficka.jpg'
    ),
    Proizvod(
        naziv= 'Monitor - Dell UltraSharp U2719D',
        cena= 42828,
        valuta= 'RSD',
        kolicina= 8,
        slika= 'Prozivodi/monitor.jpg'
    ),
    Proizvod(
        naziv= 'Bežični miš - Logitech MX Master 3',
        cena= 10700,
        valuta= 'RSD',
        kolicina= 10,
        slika= 'Prozivodi/mis.jpg'
    ),
    Proizvod(
        naziv= 'Sapiens: Kratka istorija čovečanstva', 
        cena= 2676, 
        valuta= 'RSD',
        kolicina= 30, 
        slika= 'Prozivodi/knjiga.jpg'
    )
]

Korisnici = [
    Korisnik(
        ime= 'admin',
        prezime= 'drs',
        adresa= 'Trg Dositeja Obradovića 6',
        grad= 'Novi Sad',
        drzava= 'Srbija',
        brojTelefona= '021450810',
        email= 'drsProjekat2023@gmail.com',
        lozinka= 'drsadmin'
    )
]

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
    
    subject = "Registrovan je novi korisnik"
    body = f"Podaci o korisniku:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    to_email = "drsprojekat2023@gmail.com"

    posalji_email(subject, body, to_email)
    
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
    slika = request.json['slika']

    slika = zamenaPutanje(slika)

    proizvodi.append(Proizvod(naziv, cena, valuta, kolicina, slika))
    
    app.logger.info(f"\nNaziv proivoda: {naziv}\ncena: {cena}\nvaluta: {valuta}\nkolicina {kolicina}\nslika {slika}")

    
    response_data = {
        "message": "Podaci uspješno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    
    return jsonify(response_data), 200

# Izmjena profila
@app.route('/Profil', methods=['POST'])
def izmenaProfila():
    ime = request.json['ime']
    prezime = request.json['prezime']
    adresa = request.json['adresa']
    grad = request.json['grad']
    drzava = request.json['drzava']
    brojTelefona = request.json['brTel']
    email = request.json['email']
    lozinka = request.json['lozinka']

    app.logger.info(f"Email: {email}, Password: {lozinka}")

    app.logger.info(f"Ime: {ime}, Prezime: {prezime}, Adresa: {adresa}, Grad: {grad}, Drzava: {drzava}, Broj Telefona: {brojTelefona}, Email: {email}, Lozinka: {lozinka}")

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

# Prikaz podataka na stranici Uzivo pracenje kupovina
@app.route('/Uzivo', methods=['GET'])
def get_data():
    data = [
        {
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
        }
        for proizvod in proizvodi
    ]
    return jsonify(data)

# Prikaz podataka na pocetnoj stranici
@app.route('/', methods=['GET'])
def posaljiProizvod():
    data = [
        {
            'naziv': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kolicina': proizvod.kolicina,
            'slika': proizvod.slika,
        }
        for proizvod in proizvodi
    ]

    return jsonify(data)

# Main
if __name__ == "__main__":
    app.run(debug=True)