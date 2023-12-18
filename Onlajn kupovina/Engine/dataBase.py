from notificationBy_Email import posalji_email
from User import Korisnik
from Product import Proizvod
from Card import Kartica
from Order import Kupovina
from config import db, app
import time
import threading

# Funkcija za dodavanje Korisnika u bazu podataka
def dodavanjeKorisnikaUBazu(novi_korisnik):
    with app.app_context():
        korisnik_vec_postoji = Korisnik.query.filter_by(email=novi_korisnik.email).first()
        if korisnik_vec_postoji is None:
            db.session.add(novi_korisnik)
            db.session.commit()
        else:
            print(f"Korisnik sa email {novi_korisnik.email} već postoji u bazi !")

# Funkcija za čitanje Korisnika iz baze podataka
def citanjeKorisnikaIzBaze():
    with app.app_context():
        korisniciIzBaze = Korisnik.query.all()
        return korisniciIzBaze

# Funkcija za nalaženje Korisnika po emailu u bazi podataka
def nadjiKorisnikaPoEmailu(email):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=email).first()

        if korisnik is not None:
            return korisnik
        else:
            print(f"Korisnik sa email {email} ne postoji u bazi !")
            return None

# Autorizacija Korisnika
def autorizacijaKorisnika(email, lozinka):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=email, lozinka=lozinka).first()

        if korisnik is not None:
            return korisnik
        else:
            print(f"Korisnik sa email {email} i lozinkom {lozinka} ne postoji u bazi !")
            return None
    
# Funkcija za ažuriranje Korisnika u bazi podataka
def azuriranjeKorisnikaUBazi(postojeci_korisnik):
    with app.app_context():
        korisnik_iz_baze = Korisnik.query.filter_by(email=postojeci_korisnik.email).first()

        if korisnik_iz_baze is not None:
            korisnik_iz_baze.ime = postojeci_korisnik.ime
            korisnik_iz_baze.prezime = postojeci_korisnik.prezime
            korisnik_iz_baze.adresa = postojeci_korisnik.adresa
            korisnik_iz_baze.grad = postojeci_korisnik.grad
            korisnik_iz_baze.drzava = postojeci_korisnik.drzava
            korisnik_iz_baze.brojTelefona = postojeci_korisnik.brojTelefona
            korisnik_iz_baze.email = postojeci_korisnik.email
            korisnik_iz_baze.lozinka = postojeci_korisnik.lozinka
            db.session.commit()
        else:
            print(f"Korisnik sa email {postojeci_korisnik.email} ne postoji u bazi!")

# Funkcija za dodavanje Proizvoda u bazu podataka
def dodavanjeProizvodaUBazu(novi_proizvod):
    with app.app_context():
        proizvod_vec_postoji = Proizvod.query.filter_by(naziv=novi_proizvod.naziv).first()
        if proizvod_vec_postoji is None:
            db.session.add(novi_proizvod)
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {novi_proizvod.naziv} već postoji u bazi !")

# Funkcija za čitanje Proizvoda iz baze podataka
def citanjeProizvodaIzBaze():
    with app.app_context():
        proizvodiIzBaze = Proizvod.query.all()
        return proizvodiIzBaze

# Funkcija za nalaženje Proizvoda u bazi podataka
def pronadjiProizvodPoNazivu(naziv):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=naziv).first()

        if proizvod is not None:
            return proizvod
        else:
            return None
    
# Funkcija za ažuriranje Proizvoda u bazi podataka
def azuriranjeProizvodaUBazi(postojeci_proizvod):
    with app.app_context():
        proizvodi_iz_baze = Proizvod.query.filter_by(naziv=postojeci_proizvod.naziv).first()

        if proizvodi_iz_baze is not None:
            proizvodi_iz_baze.naziv = postojeci_proizvod.naziv
            proizvodi_iz_baze.cena = postojeci_proizvod.cena
            proizvodi_iz_baze.valuta = postojeci_proizvod.valuta
            proizvodi_iz_baze.kolicina = postojeci_proizvod.kolicina
            proizvodi_iz_baze.slika = postojeci_proizvod.slika
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {postojeci_proizvod.naziv} već postoji u bazi !")


# Funkcija za dodavanje Kartice u bazu podataka
def dodavanjeKarticeUBazu(nova_kartica):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=nova_kartica.brojKartice).first()
        if kartica is None:
            db.session.add(nova_kartica)
            db.session.commit()
        else:
            print(f"Kartica sa brojem {nova_kartica.brojKartice} već postoji u bazi !")

# Funkcija za čitanje Kartica iz baze podataka
def citanjeKarticaIzBaze():
    with app.app_context():
        karticeIzBaze = Kartica.query.all()
        return karticeIzBaze
    
# Funkcija za ažuriranje Kartice u bazi podataka
def azuriranjeKarticeUBazi(postojeca_kartica):
    with app.app_context():
        kartica_iz_baze = Kartica.query.filter_by(brojKartice=postojeca_kartica.brojKartice).first()

        if kartica_iz_baze is not None:
            kartica_iz_baze.datumIsteka = postojeca_kartica.datumIsteka
            kartica_iz_baze.ccv = postojeca_kartica.ccv
            kartica_iz_baze.stanjeNaRacunu = postojeca_kartica.stanjeNaRacunu
            kartica_iz_baze.valuta = postojeca_kartica.valuta
            kartica_iz_baze.odobrena = postojeca_kartica.odobrena
            kartica_iz_baze.vlasnik = postojeca_kartica.vlasnik
            db.session.commit()
        else:
            print(f"Kartica sa brojem kartice {postojeca_kartica.brojKartice} ne postoji u bazi!")

# Funkcija za nalaženje Kartice sa određenim brojem kartice u bazi podataka
def nadjiKarticuUBaziSaBrojKartice(broj_kartice):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=broj_kartice).first()

        if kartica is not None:
            return kartica
        else:
            print(f"Kartica sa brojem {kartica.brojKartice} ne postoji u bazi !")
            return None

# Funkcija za nalaženje Kartice sa određenim vlasnikom u bazi podataka
def nadjiKarticuUBaziSaVlasnikom(vlasnik):
    with app.app_context():
        kartica = Kartica.query.filter_by(vlasnik=vlasnik).first()

        if kartica is not None:
            return kartica
        else:
            print(f"Kartica sa vlasnikom {vlasnik} ne postoji u bazi !")
            return None

# Funkcija za dodavanje Kupovine u bazu podataka
def dodajKupovinu(nova_kupovina):
    with app.app_context():
        db.session.add(nova_kupovina)
        db.session.commit()

# Funkcija za čitanje Kupovina iz baze podataka
def citanjeKupovinaIzBaze():
    with app.app_context():
        kupovine = Kupovina.query.all()
        return kupovine

# Funkcija za nalaženje Kupovine po kupcu u bazi podataka
def pronadjiKupovinePoKupcu(kupac):
    with app.app_context():
        kupovine_kupca = Kupovina.query.filter_by(kupac=kupac).all()
        return kupovine_kupca

# Funkcija za nit koja obrađuje kupovine
def dodajKupovineUListu(kupovine):
    time.sleep(60)
    telo = ""
    with app.app_context():
        for kupovina in kupovine:
            db.session.add(kupovina)
            if len(kupovine) > 0:
                telo += f"Podaci o kupovinama:\nNaziv proizvoda: {kupovina.proizvod}\nKupac: {kupovina.kupac}\nNaručena količina: {kupovina.kolicina}\nCena jednog proizvoda: {kupovina.cenaKupovine}\nDatum kupovine: {kupovina.datumKupovine}\nUkupan iznos: {float(kupovina.cenaKupovine) * int(kupovina.kolicina)}\nValuta: {kupovina.valuta}\n"

        db.session.commit()

    if telo != "":
        naslov = "Kupljen je proivod na stranici"
        kome = "drsprojekat2023@gmail.com"
        posalji_email(naslov, telo, kome)

    kupovine.clear()

# Funkcija za pokretanje niti za obradu kupovina
def pokreni_nit(kupovine):
    nit = threading.Thread(target=dodajKupovineUListu, args=(kupovine,))
    nit.start()