class Kartica :
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
        'vlasnik': {
            'email': kartica.vlasnik.email
        },
        'odobrena': kartica.odobrena
    }