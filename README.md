# Distribuirani računarski sistemi

### **Kratak opis rada aplikacije :**
Aplikacija simulira rad onlajn prodavnice.<br>
Prvi korak je registracija i nakon toga prijava. Nakon čega je potrebno dodati karticu za svoj nalog.<br>
Nakon uspešne registracije admin dobija obaveštenje na email da se registrovao novi korisnik.<br>
Dodata kartica stiže adminu na verifikaciju. Nakon što admin verifikuje karticu moguća je kupovina proizvoda.<br>
Kad želimo da naručimo proizvod, potrebno je da odaberemo valutu u kojoj želimo da platimo i količinu.<br>
Nakon toga će se čekati jedan minut, da se proveri da li ima još kupovina da se sve kupovine izvrše odjednom.<br>
Nakon isteka jednog minuta sa naše kartice se skida cena proizvoda u valuti koju smo odabrali.<br>
Admin stranice je ujedno i vlasnik pa se kod kupovina novac prebacuje na njegov račun.<br>
Admin dobija obaveštenje na email da se desila kupovina na sajtu.<br>
Kao kupac imamo još sledeće opcije - izmena profila, dodavanja kartice na nalog, uplata na račun, menjanje valuta na računu i pregled istorijata kupovina.<br>
Admin ima sledeće opcije - dodavanje proizvoda, povećanje količine proizvoda, verifikacija korisničkih naloga i uživo praćenje kupovina.<br>

### **Komponente projekta :**
* **db** -> _Baza podataka_ - SQL komande za kreiranje baze podataka
* **Engine** -> _Servis za obradu zahteva i podataka_ - Cela logika rada aplikacije (Back-end)
* **ui** -> _Korisnički interfejs_ - React aplikacija (Front-end)

### **Tehnologije koje su korišćene u projektu :**
* **Klijent-Server arhitektura** -> _Klijent_ je React aplikacija a _Server_ je Python Flask aplikacija
* **React** -> _Klijent_ (Korisnički interfejs) je implementiran kao React aplikacija
* **HTML i CSS** -> _HTML_ je samo bazni deo u React aplikaciji na koji se ona mapira a _CSS_ je za stilove
* **Python Flask aplikacija** -> _Server_ je implementiran kao Python Flask aplikacija
* **Baza podataka** -> _Microsoft SQL Server 2022_ relaciona baza podataka, za prikaz podataka -> _Microsoft SQL Server Management Studio 19_

### **Izgled stranica :**

**Početna:**
![Pocetna](https://github.com/MastilovicRadoslav/DRS/assets/122049689/24378437-3680-4b29-849e-03cd9c5b14c3)

**Prijava:**
![Prijavljivanje](https://github.com/MastilovicRadoslav/DRS/assets/122049689/2577fcef-8727-47fe-9c3d-b936765358ea)

**Registracija:**
![Registracija](https://github.com/MastilovicRadoslav/DRS/assets/122049689/cb574817-d99d-49e2-bfca-a69ac9780d02)

**Profil:**
![Profil](https://github.com/MastilovicRadoslav/DRS/assets/122049689/c9b41a0d-cdc3-42f7-805b-f436084ba918)

**Dodavanje kartice:**
![Dodavanje kartice](https://github.com/MastilovicRadoslav/DRS/assets/122049689/12e81a9f-f08c-4527-b938-3e55ae4712a4)

**Pregled računa:**
![Pregled racuna](https://github.com/MastilovicRadoslav/DRS/assets/122049689/42f27b26-9f23-4858-a7a3-137a3de7bb99)

**Uplata i konverzija:**
![Uplata i konverzija valuta](https://github.com/MastilovicRadoslav/DRS/assets/122049689/d655ed93-5383-45e2-9c0e-a838f04c1497)

**Istorijat:**
![Kupljeni prozivodi](https://github.com/MastilovicRadoslav/DRS/assets/122049689/38ce780b-a1cb-464a-9e0f-1f820df768cd)

**Naručivanje:**
![Kupovina prozivoda](https://github.com/MastilovicRadoslav/DRS/assets/122049689/d8d55e0f-19b9-4fec-a2ed-5207dfa152f9)

**Dodavanje proizvoda:**
![Dodavanje prozvoda](https://github.com/MastilovicRadoslav/DRS/assets/122049689/dfe07bbe-dafd-4cca-9fe8-4546f10ecd14)

**Izmena količine proizvoda:**
![Povecanje Kolicine prozivoda](https://github.com/MastilovicRadoslav/DRS/assets/122049689/2c0039e4-9df7-4f94-888c-c1279147ec63)

**Uživo praćenje kupovina:**
![Uzivo pracenje prozivoda](https://github.com/MastilovicRadoslav/DRS/assets/122049689/cd54e85c-cb12-4bb1-ade2-c01d9e939cfc)

**Verifikacija naloga:**
![Verifikacija kartice](https://github.com/MastilovicRadoslav/DRS/assets/122049689/9ca8ae85-3e77-4304-a49d-8feb162863b3)