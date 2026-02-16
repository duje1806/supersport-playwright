Supersport Playwright Test

Opis zadatka : 

Ovaj projekt sadrži jedan Playwright test koji:
- Otvara supersport.hr
- Odabire dva nasumična para
- Unosi nasumični ulog
- Provjerava je li iznos "Ev. Isplata" jednak matematičkom izračunu u testu
Test pravi web listić koji se naknadno uplaćuje u poslovnici, bez izrade računa.

Na koji način test radi
1. Otvara stranicu:
   https://www.supersport.hr/sport/day/1
2. Zatvara cookie bannere (ako su prikazani)
3. Odabire 2 nasumične kvote iz tablice
4. S listića čita koeficijente oba para
5. Izračunava kombinirani tečaj (množenje oba koeficijenta)
6. Unosi nasumičan ulog (između 5€ i 24€)
7. Računa očekivanu isplatu prema formuli:
Manipulativni trošak = 5%
Porez = 10%
netStake = stake - 5%
grossWin = netStake * combinedOdds
tax = (grossWin - netStake) × 10%
finalWin = grossWin - tax
8. Uspoređuje izračunati rezultat s prikazanim iznosom u UI-u
Zbog zaokruživanja dopuštena je razlika do 0.01 €.

Instalacija
1. Instalirati pakete:
npm install
2. Instalirati Playwright browsere:
npx playwright install
Pokretanje testa
Iz root foldera projekta:
npx playwright test --headed
ili:
npx playwright test
