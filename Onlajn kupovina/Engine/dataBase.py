from User import Korisnik
from Product import Proizvod
from config import db, app

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

# Funkcija za dodavanje proizvoda u bazu podataka
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