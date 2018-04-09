# simplecalc - Lihtne veebipõhine kalkulaatori rakendus

See on varasema veebipõhise kalkulaatori "hübridiseeritud" variant.

## Rakenduse kesta loomine

### PhoneGap käsurea (CLI) kasutamine rakenduse kesta loomiseks 

    $ phonegap create simpleCalc -id "ee.tlu.hk.priidu.simplecalc" --template blank

Seejärel kopeerime kogu oma varasema rakenduse www alamkataloogi.
	
### Arvutis

Brauseris võib endiselt testimiseks avada:

    /www/index.html

### PhoneGap enda keskkonnas saab anda vastava käsu

    $ cd simplecalc
    $ phonegap run

Kui soovime rakenduse käivitada näiteks Androidi seadmel, saame anda käsu

    $ phonegap run android
