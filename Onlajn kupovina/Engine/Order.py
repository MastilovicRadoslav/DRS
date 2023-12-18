from config import db
class Kupovina (db.Model):
    __table_name__="Kupovina",
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    datumKupovine = db.Column(db.String, nullable=False)
    proizvod = db.Column(db.String, nullable=False)
    kupac = db.Column(db.String, nullable=False)
    kolicina = db.Column(db.Integer, nullable=False)
    cenaKupovine = db.Column(db.Float, nullable=False)
    valuta = db.Column(db.String, nullable=False)

    def __init__(self, datumKupovine, proizvod, kupac, kolicina, cenaKupovine, valuta):
        self.datumKupovine = datumKupovine
        self.proizvod = proizvod
        self.kupac = kupac
        self.kolicina = kolicina
        self.cenaKupovine = cenaKupovine
        self.valuta = valuta