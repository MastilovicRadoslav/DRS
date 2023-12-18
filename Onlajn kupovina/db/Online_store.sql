-- Kreiranje baze podataka
CREATE DATABASE Prodavnica;

-- U bazu podataka dodajemo sledeće tabele :
USE Prodavnica;

-- Kreiranje tabele za korisnike
CREATE TABLE Korisnik (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ime VARCHAR(50),
    prezime VARCHAR(50),
    adresa VARCHAR(50),
    grad VARCHAR(50),
    drzava VARCHAR(50),
    brojTelefona VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    lozinka VARCHAR(50)
);

-- Kreiranje tabele za proizvode
CREATE TABLE Proizvod(
    id INT IDENTITY(1,1) PRIMARY KEY,
    naziv VARCHAR(50) UNIQUE,
    cena FLOAT,
    valuta VARCHAR(50),
    kolicina INT,
    slika VARCHAR(50)
);

-- Kreiranje tabele za Karticu
CREATE TABLE Kartica (
    id INT IDENTITY(1,1) PRIMARY KEY,
    brojKartice VARCHAR(16) UNIQUE,
    datumIsteka VARCHAR(5),
    ccv VARCHAR(3),
    stanjeNaRacunu FLOAT,
    valuta VARCHAR(3),
    odobrena VARCHAR(2),
    vlasnik VARCHAR(50),
    FOREIGN KEY (vlasnik) REFERENCES Korisnik(email)
);

-- Kreiranje tabele za Kupovine
CREATE TABLE Kupovina (
    id INT IDENTITY(1,1) PRIMARY KEY,
    datumKupovine VARCHAR(50),
    proizvod VARCHAR(50),
    kupac VARCHAR(50),
    kolicina INT,
    cenaKupovine FLOAT,
    valuta VARCHAR(50),
    FOREIGN KEY (kupac) REFERENCES Korisnik(email),
    FOREIGN KEY (proizvod) REFERENCES Proizvod(naziv)
);