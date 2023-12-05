from config import db
class Korisnik (db.Model):
    table_name="Korisnik",
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ime = db.Column(db.String, nullable=False)
    prezime = db.Column(db.String, nullable=False)
    adresa = db.Column(db.String, nullable=False)
    grad = db.Column(db.String, nullable=False)
    drzava = db.Column(db.String, nullable=False)
    brojTelefona = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    lozinka = db.Column(db.String, nullable=False)

    def __init__(self, ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka):
        self.ime = ime
        self.prezime = prezime
        self.adresa = adresa
        self.grad = grad
        self.drzava = drzava
        self.brojTelefona = brojTelefona
        self.email = email
        self.lozinka = lozinka

    