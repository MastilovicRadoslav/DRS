from config import db
class Proizvod (db.Model):
    tablename="Proizvod"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    naziv=db.Column(db.String,nullable=False)
    cena=db.Column(db.Float,nullable=False)
    valuta=db.Column(db.String,nullable=False)
    kolicina=db.Column(db.Integer,nullable=False)
    slika=db.Column(db.String,nullable=False)
    
    def __init__(self, naziv, cena, valuta, kolicina, slika):
        self.naziv = naziv
        self.cena = cena
        self.valuta = valuta
        self.kolicina = kolicina
        self.slika = slika