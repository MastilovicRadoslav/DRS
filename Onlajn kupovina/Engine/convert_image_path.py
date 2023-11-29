import os

def zamenaPutanje(putanja):
    nazivFajla = os.path.basename(putanja)
    noviFormat = f"Proizvodi/{nazivFajla}"
    return noviFormat