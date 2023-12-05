from flask import Flask, request, jsonify
from flask_cors import CORS
from notificationBy_Email import posalji_email
from Product import Proizvod
from User import Korisnik
from convert_image_path import zamenaPutanje
from datetime import datetime

app = Flask(__name__)

CORS(app, supports_credentials=True)

# Test podaci za prikaz početnih proizvoda
proizvodi = [
    Proizvod(
        naziv= 'Laptop - ASUS ROG Strix G17',
        cena= 222000,
        valuta= 'RSD',
        kolicina= 5,
        slika= 'Proizvodi/laptop.jpg'
    ),
    Proizvod(
        naziv= 'Grafička kartica - NVIDIA GeForce RTX 3080', 
        cena= 85657, 
        valuta= 'RSD',
        kolicina= 2, 
        slika= 'Proizvodi/graficka.jpg'
    ),
    Proizvod(
        naziv= 'Monitor - Dell UltraSharp U2719D',
        cena= 42828,
        valuta= 'RSD',
        kolicina= 8,
        slika= 'Proizvodi/monitor.jpg'
    ),
    Proizvod(
        naziv= 'Bežični miš - Logitech MX Master 3',
        cena= 10700,
        valuta= 'RSD',
        kolicina= 10,
        slika= 'Proizvodi/mis.jpg'
    ),
    Proizvod(
        naziv= 'Sapiens: Kratka istorija čovečanstva', 
        cena= 2676, 
        valuta= 'RSD',
        kolicina= 30, 
        slika= 'Proizvodi/knjiga.jpg'
    )
]

# Admin u našoj aplikaciji
Korisnici = [
    Korisnik(
        ime= 'admin',
        prezime= 'drs',
        adresa= 'Trg Dositeja Obradovica 6',
        grad= 'Novi Sad',
        drzava= 'Srbija',
        brojTelefona= '021450810',
        email= 'drsprojekat2023@gmail.com',
        lozinka= 'drsadmin'
    )
]

prijavljen = None

# Obrada prijavljivanja
@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']
    global prijavljen

    for korisnik in Korisnici:
        if korisnik.email == email:
            prijavljen = korisnik
            break
    
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
    
    naslov = "Registrovan je novi korisnik"
    telo = f"Podaci o korisniku:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    primaoc = "drsprojekat2023@gmail.com"

    posalji_email(naslov, telo, primaoc)
    
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

# Izmena profila
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
    global prijavljen

    for korisnik in Korisnici:
        if korisnik.ime != ime:
            prijavljen.ime = ime

        if korisnik.prezime != prezime:
            prijavljen.prezime = prezime

        if korisnik.adresa != adresa:
            prijavljen.adresa = adresa

        if korisnik.grad != grad:
            prijavljen.grad = grad

        if korisnik.drzava != drzava:
            prijavljen.drzava = drzava

        if korisnik.brojTelefona != brojTelefona:
            prijavljen.brojTelefona = brojTelefona

        if korisnik.email != email:
            prijavljen.email = email

        if korisnik.lozinka != lozinka:
            prijavljen.lozinka = lozinka

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

# Prihvatanje podataka za karticu korisnika
@app.route('/Kartica', methods=['POST'])
def dodavanjeKartice():

    brojKartice = request.json['brojKartice']
    datumIsteka = request.json['datumIsteka']
    cvv = request.json.get('cvv')

    app.logger.info(f"\nBroj kartice: {brojKartice}\nDatum isteka: {datumIsteka}\nCVV: {cvv}")

    response_data = {
        "message": "Podaci uspješno primljeni",
        "brojKartice": brojKartice,
        "datumIsteka": datumIsteka,
        "cvv": cvv,
    }

    return jsonify(response_data), 200

# Prikaz podataka na stranici Uzivo pracenje kupovina
@app.route('/Uzivo', methods=['GET'])
def prikazZaUzivoPracenje():
    data = [
        {
            'slika' : proizvod.slika,
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac' : 'radoslav930@gmail.com'
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

    global prijavljen
    priljavjen_i_proizvodi = {}
    if prijavljen is not None:
        priljavjen_i_proizvodi = {
            'email': prijavljen.email,
            'proizvodi': data
        }
    else:
        priljavjen_i_proizvodi = {
            'email': '',
            'proizvodi': data
        }

    return jsonify(priljavjen_i_proizvodi)

# Prikaz podataka na stranici za izmenu profila
@app.route('/Profil', methods=['GET'])
def izmeniProfil():
    global prijavljen

    data = {}

    if prijavljen is not None:
        data = {
            "ime": prijavljen.ime,
            "prezime": prijavljen.prezime,
            "adresa": prijavljen.adresa,
            "grad": prijavljen.grad,
            "drzava": prijavljen.drzava,
            "brTel": prijavljen.brojTelefona,
            "email": prijavljen.email,
            "lozinka": prijavljen.lozinka
        }

    return jsonify(data)

# Prikaz podataka na stranici Istorijat kupovina
@app.route('/Istorijat', methods=['GET'])
def kupljeniProizvodi():

    p = Proizvod(
        naziv= 'Sapiens: Kratka istorija čovečanstva', 
        cena= 2676, 
        valuta= 'RSD',
        kolicina= 30, 
        slika= 'Proizvodi/knjiga.jpg'
    )

    data = [
        {
            'slika': p.slika,
            'nazivProizvoda': p.naziv,
            'cena': p.cena,
            'valuta': p.valuta,
            'kolicina': p.kolicina,
            'vreme': datetime.now().strftime("%Y.%m.%d %H:%M:%S")
        }
    ]

    return jsonify(data)

# Main
if __name__ == "__main__":
    app.run(debug=True)