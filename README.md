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