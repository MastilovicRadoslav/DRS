from notificationBy_Email import posalji_email
from convert_image_path import zamenaPutanje
from datetime import datetime
from Product import Proizvod
from User import Korisnik
from dataBase import *
from config import *
from Card import *

# Test podaci za prikaz početnih proizvoda
pocetniProizvodi = [
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

# Kod prvog pokretanja aplikacije odkomentarisati
#for p in pocetniProizvodi:
#    dodavanjeProizvodaUBazu(p)

# Admin u našoj aplikaciji
admin = Korisnik(
        ime= 'admin',
        prezime= 'drs',
        adresa= 'Trg Dositeja Obradovica 6',
        grad= 'Novi Sad',
        drzava= 'Srbija',
        brojTelefona= '021450810',
        email= 'drsprojekat2023@gmail.com',
        lozinka= 'drsadmin'
    )

# Kod prvog pokretanja aplikacije odkomentarisati
#dodavanjeKorisnikaUBazu(admin)

# Kartica Admina
kartica_admina = Kartica('9999666696966969', '12/28', '666', '0', 'USD', admin.email, "Da")

# Kod prvog pokretanja aplikacije odkomentarisati
#dodavanjeKarticeUBazu(kartica_admina)

# Učitavanje iz baze
korisnici = citanjeKorisnikaIzBaze()
proizvodi = citanjeProizvodaIzBaze()

# Globalne promjenljive
kupovine = []
prijavljen = None

# Obrada prijavljivanja
@app.route('/Prijava', methods=['POST'])
def prijava():

    email = request.json['email']
    lozinka = request.json['lozinka']
    global prijavljen

    prijavljen = nadjiKorisnikaPoEmailu(email)
    k = autorizacijaKorisnika(email, lozinka)

    if prijavljen is not None and k is not None:
        data = {
            'tip': '1',
            "message": "Prijava je uspešna !!"
        }
        return jsonify(data), 200

    if prijavljen is not None and k is None:
        data = {
            'tip': '2',
            "message": "Prijava nije uspešna. Verovatno ste uneli pogrešnu lozniku !!"
        }
        return jsonify(data), 200

    elif k is None and prijavljen is None:
        data = {
            'tip': '3',
            "message": "Prijava nije uspešna. Niste se registrovali !!"
        }
        return jsonify(data), 200

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

    # Upis novih korisnika u bazu
    novo_Registrovani = Korisnik(ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka)
    dodavanjeKorisnikaUBazu(novo_Registrovani)
        
    # Podešavanje i slanje email-a 
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

    # Zamena putanje sa fakePath/nazivFajla -> Proizvodi/nazivFajla
    slika = zamenaPutanje(slika)

    # Upis novih prozivoda u bazu
    novi_proizvod = Proizvod(naziv, cena, valuta, kolicina, slika)
    dodavanjeProizvodaUBazu(novi_proizvod)
    
    response_data = {
        "message": "Podaci uspješno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    return jsonify(response_data), 200

# Izmena profila
@app.route('/Profil', methods=['PUT'])
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

    for korisnik in korisnici:
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

    # Ažuriranje korisnika
    k = Korisnik(ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka)
    azuriranjeKorisnikaUBazi(k)

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
    
    # Dodavanje kartice u bazu
    kartica = Kartica(brojKartice=brojKartice, datumIsteka=datumIsteka, ccv=cvv,
                      stanjeNaRacunu=0.0, valuta="USD", odobrena="Ne", vlasnik=prijavljen.email)
    dodavanjeKarticeUBazu(kartica)

    response_data = {
        "message": "Podaci uspješno primljeni",
        "brojKartice": brojKartice,
        "datumIsteka": datumIsteka,
        "cvv": cvv,
    }
    return jsonify(response_data), 200

# Izmena količine od strane admina
@app.route('/IzmenaKolicine', methods=['PUT'])
def izmenjenaKolicina():

    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']
    slika = request.json['slika']

    # Izmjena proizvoda u bazi
    p = Proizvod(naziv, cena, valuta, kolicina, slika)
    azuriranjeProizvodaUBazi(p)

    response_data = {
        "message": "Podaci uspješno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    return jsonify(response_data), 200

# Prijem podataka sa stranice Verifikacija
@app.route('/Verifikacija', methods=['PUT'])
def verifikovaneKartice():

    email = request.json['email']
    brojKartice = request.json['brojKartice']
    odobrena = request.json['odobrena']

    # Da se nađe u bazi kartica sa vlasnikom koji ima email isti i da se ažurira polje odobrena
    kartica = nadjiKarticuUBaziSaBrojKartice(brojKartice)
    kartica.odobrena = odobrena
    azuriranjeKarticeUBazi(kartica)

    data = {
        'massage': 'Podaci uspešno primljeni'
    }

    return jsonify(data), 200

# Prijem podataka sa stranice UplataKonverzija
@app.route('/Konverzija', methods=['PUT'])
def konverzija():

    email = request.json['email']
    brojKartice = request.json['brojKartice']
    stanje = request.json['stanje']
    valuta = request.json['valuta']

    kartica = nadjiKarticuUBaziSaBrojKartice(brojKartice)
    kartica.stanjeNaRacunu = stanje
    kartica.valuta = valuta

    # Ažuriranje stanja na kartici
    azuriranjeKarticeUBazi(kartica)

    data = {
        'massage': 'Podaci uspešno primljeni'
    }

    return jsonify(data), 200

# Prijem podataka sa stranice UplataKonverzija
@app.route('/Uplata', methods=['PUT'])
def uplata():

    email = request.json['email']
    brojKartice = request.json['brojKartice']
    iznos = request.json['iznos']
    valuta = request.json['valuta']

    kartica = nadjiKarticuUBaziSaBrojKartice(brojKartice)

    if valuta == '':
        valuta = kartica.valuta

    # Ažuriranje stanja na kartici
    if proveraValuta(kartica, valuta):
        konvertovanIznos = float(iznos)
        kartica.stanjeNaRacunu += konvertovanIznos
        azuriranjeKarticeUBazi(kartica)
    else:
        print("Valute nisu iste !!")

    data = {
        'massage': 'Podaci uspešno primljeni'
    }

    return jsonify(data), 200

# Prijem podataka sa Pocetne stranice
@app.route('/Naruci', methods=['POST'])
def narucivanjeProizvoda():

    global kupovine
    nazivProizvoda = request.json['nazivProizvoda']
    cena = request.json['cena']
    cena = request.json['cena']
    valuta = request.json['valuta']
    kolicina = request.json['kolicina']
    zaradaAdmina = request.json['zaradaAdmina']

    kupovina = Kupovina(str(datetime.now().strftime("%d %m %Y %H:%M")), nazivProizvoda,
                        prijavljen.email, kolicina, cena, valuta)
    kupovine.append(kupovina)

    # Poziv za nit
    pokreni_nit(kupovine)

    # Ažuriranje podataka u bazi
    for kupovina in kupovine:
        proizvod_za_izmenu = pronadjiProizvodPoNazivu(kupovina.proizvod)
        if proizvod_za_izmenu is not None:
            proizvod_za_izmenu.kolicina -= int(kupovina.kolicina)
            azuriranjeProizvodaUBazi(proizvod_za_izmenu)

        kartica_prijavljenog = nadjiKarticuUBaziSaVlasnikom(kupovina.kupac)
        if kartica_prijavljenog is not None:
            stanje = float(kartica_prijavljenog.stanjeNaRacunu)
            stanje -= (float(kupovina.cenaKupovine) * int(kupovina.kolicina))
            kartica_prijavljenog.stanjeNaRacunu = str(stanje)
            azuriranjeKarticeUBazi(kartica_prijavljenog)

        zarada = float(kartica_admina.stanjeNaRacunu)
        zarada += float(zaradaAdmina)
        kartica_admina.stanjeNaRacunu = str(zarada)
        azuriranjeKarticeUBazi(kartica_admina)

    data = {
        'massage': 'Podaci uspešno primljeni'
    }

    return jsonify(data), 200

# Prikaz podataka na stranici Uzivo pracenje kupovina
@app.route('/Uzivo', methods=['GET'])
def uzivoPracenje():

    # Iz baze sve proizvode
    proizvodi = citanjeProizvodaIzBaze()
    kupovine = citanjeKupovinaIzBaze()

    data = [
        {
            'slika': proizvod.slika,
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac': next((kupovina.kupac for kupovina in kupovine if kupovina.proizvod == proizvod.naziv), ''),
            'vreme': next((kupovina.datumKupovine for kupovina in kupovine if kupovina.proizvod == proizvod.naziv), '')
        }
        for proizvod in proizvodi
    ]

    return jsonify(data), 200


# Prikaz podataka na pocetnoj stranici
@app.route('/', methods=['GET'])
def posaljiProizvod():

    proizvodi = citanjeProizvodaIzBaze()

    # Čitanje proizvoda iz baze
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
        kartica = nadjiKarticuUBaziSaVlasnikom(prijavljen.email)
        if kartica is not None:
            priljavjen_i_proizvodi = {
                'email': prijavljen.email,
                'proizvodi': data,
                'kartica': serializacija_kartice(kartica)
            }
        else:
            priljavjen_i_proizvodi = {
                'email': prijavljen.email,
                'proizvodi': data,
                'kartica': ''
            }
    else:
        priljavjen_i_proizvodi = {
            'email': '',
            'proizvodi': data,
            'kartica': ''
        }

    return jsonify(priljavjen_i_proizvodi), 200

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

    return jsonify(data), 200

# Prikaz podataka na stranici Istorijat kupovina
@app.route('/Istorijat', methods=['GET'])
def kupljeniProizvodi():

    kupovine = pronadjiKupovinePoKupcu(prijavljen.email)
    kupovine.reverse()
    prikaz_kupljenih = {}
    # Čitanje iz baze
    for k in kupovine:
        if k.kupac == prijavljen.email:
            nadjen_proizvod = pronadjiProizvodPoNazivu(k.proizvod)
            if k.proizvod == nadjen_proizvod.naziv:
                kupljen = Proizvod(k.proizvod, nadjen_proizvod.cena,
                                   nadjen_proizvod.valuta, k.kolicina, nadjen_proizvod.slika)
                prikaz_kupljenih[kupljen] = k.datumKupovine

    data = [
        {
            'slika': p.slika,
            'nazivProizvoda': p.naziv,
            'cena': p.cena,
            'valuta': p.valuta,
            'kolicina': p.kolicina,
            'vreme': prikaz_kupljenih[p]
        }
        for p in prikaz_kupljenih
    ]

    return jsonify(data), 200

# Prikaz podataka na stranici Uzivo pracenje kupovina
@app.route('/Pregled', methods=['GET'])
def prikazRacuna():

    kartica = None
    if prijavljen is not None:
        kartica = nadjiKarticuUBaziSaVlasnikom(prijavljen.email)
    # Čitanje iz baze
    if kartica is not None and kartica.odobrena == 'Da':
        data = {
            'brojKartice': kartica.brojKartice,
            'datumIsteka': kartica.datumIsteka,
            'stanje': kartica.stanjeNaRacunu,
            'valuta': kartica.valuta
        }
        return jsonify(data)
    else:
        data = {
            'brojKartice': '',
            'datumIsteka': '',
            'stanje': '',
            'valuta': ''
        }
        return jsonify(data), 200

# Prikaz podataka za izmenu količine
@app.route('/IzmenaKolicine', methods=['GET'])
def izmenaKolicine():

    proizvodi = citanjeProizvodaIzBaze()

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

    return jsonify(data), 200

# Prikaz podataka na stranici za Verifikaciju
@app.route('/Verifikacija', methods=['GET'])
def verifikacijaKartica():

    kartice = citanjeKarticaIzBaze()
    serialozovane_kartice = [serializacija_kartice(
        kartica) for kartica in kartice]
    kartice_za_slanje = []

    # Čitanje podataka za karticu
    for k in serialozovane_kartice:
        if k['vlasnik'] != "drsprojekat2023@gmail.com" and k['odobrena'] != 'Da':
            kartice_za_slanje.append(k)

    data = {
        'kartice': kartice_za_slanje
    }

    return jsonify(data), 200

# Prikaz podataka na stranici UplataKonverzija
@app.route('/UplataKonverzija', methods=['GET'])
def uplataiKonverzija():

    kartica = None
    if (prijavljen != None):
        kartica = nadjiKarticuUBaziSaVlasnikom(prijavljen.email)

    # Slanje podataka o kartici
    if (kartica != None):
        data = {
            'kartica': serializacija_kartice(kartica)
        }
        return jsonify(data)
    else:
        data = {
            'kartica': ''
        }
        return jsonify(data), 200

# Main
if __name__ == "__main__":
    app.run(debug=True)