-- Kreiranje tabele za korisnike
create table Korisnik (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ime VARCHAR(50),
    prezime VARCHAR(50),
    adresa VARCHAR(100),
    grad VARCHAR(50),
    drzava VARCHAR(50),
    brojTelefona VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    lozinka VARCHAR(100)
);

-- Kreiranje tabele za proizvode
create table Proizvod(
    id INT IDENTITY(1,1) PRIMARY KEY,
    naziv varchar(100) UNIQUE,
    cena float,
    valuta varchar(50),
    kolicina int,
    slika varchar(100)
);