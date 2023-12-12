from config import db
class Kartica (db.Model):
    table_name="Kartica",
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brojKartice = db.Column(db.String, unique=True, nullable=False)
    datumIsteka = db.Column(db.String, nullable=False)
    ccv = db.Column(db.String, nullable=False)
    stanjeNaRacunu = db.Column(db.Float, nullable=False)
    valuta = db.Column(db.String, nullable=False)
    odobrena = db.Column(db.String, nullable=False)
    vlasnik = db.Column(db.String, nullable=False)
    
    def __init__(self, brojKartice, datumIsteka, ccv, stanjeNaRacunu, valuta, vlasnik, odobrena):
        self.brojKartice = brojKartice
        self.datumIsteka = datumIsteka
        self.ccv = ccv
        self.stanjeNaRacunu = stanjeNaRacunu
        self.valuta = valuta
        self.vlasnik = vlasnik
        self.odobrena = odobrena


# Funkcija koja serializuje kartice, da bi mogli da pošaljemo na front
def serializacija_kartice(kartica):
    return {
        'brojKartice': kartica.brojKartice,
        'datumIsteka': kartica.datumIsteka,
        'ccv': kartica.ccv,
        'stanjeNaRacunu': kartica.stanjeNaRacunu,
        'valuta': kartica.valuta,
        'vlasnik': kartica.vlasnik,
        'odobrena': kartica.odobrena
    }
    
#Funkcija za proveru kod uplate da li su valute iste
def proveraValuta(self, valuta):
    if self.valuta == valuta:
        return True
    else:
        return False