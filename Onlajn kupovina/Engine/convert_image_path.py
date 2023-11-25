import os

def zamenaPutanje(putanja):
    nazivFajla = os.path.basename(putanja)
    noviFormat = f"Prozivodi/{nazivFajla}"
    return noviFormat