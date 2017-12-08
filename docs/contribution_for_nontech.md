# Bidrag til styleguiden uden kendskab til kode

Denne guide er for dig som ingen kendskab til kode har, men stadigt vil bidrage til frontend styleguiden.
Guiden vil hjælpe dig igennem - step for step - hvordan du opsætter din computer til at kunne bidrage.

## Hvad kan du bidrage med?
Man skal bestemt ikke kunne kode for at bidrage til frontend styleguiden. Faktisk er størstedelen af styleguiden bygget op af simple tekstsider, der dokumenterer alle de gode råd og regler man bør følge når man skal opbygge en ny underside til f.eks. borger.dk eller virk.dk. Disse tekstsider er alle skrevet af ikke-kodere, og du kan nemt være med til at tilføje dine gode råd og regler til disse sider, så styleguiden kan blive endnu bedre og mere præcis.

### Tekstsidernes opbygning
Tekstsiderne er skrevet med noget der hedder "Markdown", som er næsten ligesom at skrive et almindeligt word-dokument. Når du har skrevet dit Markdown-dokument og lægger det op på frontend styleguiden, bliver det automatisk omdannet til en præsentabelt side på frontend styleguidens hjemmeside. F.eks. er denne side skrevet med Markdown, så nemt er det! 

### Kom i gang med at skrive Markdown
Markdown er en simpel måde at skrive pæne tekster til hjemmesider, og skrives som en almindelig tekst blot tilsat nogle få specielle karakterer som * eller #, der bestemmer hvordan teksten skal se ud.

Man kan med markdown for eksempel skrive en overskrift ved at sætte et # ind foran teksten, og således bliver "# Dette er en overskrift", lavet automatisk om til: 

# Dette er en overskrift

At lære de forskellige tegn at kende kan være besværligt, dog for at gøre det nemt er der opfundet et simpelt skriveprogram, typora, hvor du ikke behøver disse tegn. 

Programmet kan hentes på https://typora.io/ og vil blive brugt fremmadrettet i guiden.

Du kan let komme i gang med Markdown og Typora med følgende guide: LINK TIL GUIDE HER

## Sæt din computer op til styleguiden

For at kunne bidrage til frontend styleguiden skal din computer være sat op til at kunne hente frontend styleguiden ned på din computer, og være sat op til at kunne skubbe dine ændringer op på den officielle frontend styleguide igen.

Dette gøres med det simple program Sourcetree. Sourcetree kræver at man har en bruger på Atlassian. En Atlassian bruger kan oprettes gratis her: <https://id.atlassian.com/login?application=mac&continue=https://my.atlassian.com>

Du er nu klar og kan installere Sourcetree ved at følge nedenstående skridt:

1. Download Sourcetree fra følgende side: <https://www.sourcetreeapp.com/>
2. Start installationen af Sourcetree og gå igennem installationsskridtene
3. Login med din nye Atlassian bruger når du bliver bedt om det
4. Efter du er logget ind, skal du blot trykke på "Skip Setup".
5. Når installation er gennemført skal du åbne Sourcetree. Du vil nu støde på om til to beskeder:
   1. Hvis Sourcetree ikke kan finde Mercurial, skal du vælge muligheden: "I don't want to use Mercurial"
   2. Hvis Sourcetree ikke kan finde Git, skal du vælge muligheden: "Download an embedded version of Git for Sourcetree alone to use."

Du er nu klar til at hente frontend styleguiden ned på din computer. Dette kaldes at "clone", og kan gøres med Sourcetree. 

Følg skridtene nedenfor:

1. Tryk på "clone" knappen i toppen af Sourcetree
2. I den første boks med teksten *Source Path / URL* skal du indsætte følgende link: 
   https://github.com/jonasjensen77/frontend-styleguide-poc.git
3. Klik på næste boks, hvorefter resten af felterne vil udfylde sig selv
4. Lad felterne være som de er, og tryk på "Clone"-knappen
5. Vent til handlingen er afsluttet. Du har nu hentet frontend styleguiden ned.

### Skab dit bidrag til frontend styleguiden

Når du har hentet frontend styleguiden, kan du frit lave ændringer i de sider de har lyst til. Da du "clonede" tidligere, blev frontend styleguiden lagt ind i en mappe, der i de fleste tilfælde har lagt sig i din dokumenter-mappe. Frontend styleguide-mappen du leder efter hedder noget med *frontend-styleguide-poc*, og inde i den finder du en masse forskellige filer og mapper. Selvom det kan se uoverskueligt ud, skal du ikke blive skræmt, da du som ikke-koder kun skal fokusere på mapperne *_components* og *pages*. I disse to mapper vil der ligge utalige markdown filer, (Bemærk at filer der slutter på .md er markdown filer) som hver især svarer til en underside på frontend styleguidens hjemmeside. Et par forskellige markdown dokumenter du f.eks. kan åbne for at se hvordan det ser ud i Typora, ligger i *_components*-mappen efterfulgt af *fundament*-mappen:

1. **layout.md** svarer til følgende side: 
   https://jonasjensen77.github.io/frontend-styleguide-poc/components/fundament/layout/?s=undefined
2.  **touch.md** svarer til følgende side: 
   https://jonasjensen77.github.io/frontend-styleguide-poc/components/fundament/mobile/?s=undefined

Når du åbner disse filer, har du mulighed for at ændre i dem med Typora. Når du er færdig med dine ændringer og er tilfreds med dem, har du mulighed for at lægge dem op på den officielle frontend styleguide.

### Skub dine ændringer op på frontend styleguiden
Commit/Pull/Push

Kapitlet bliver skrevet....



## Spørgsmål
### Hvorfor kan jeg ikke se min bidragelse på den officielle frontend styleguide hjemmeside?
Selvom du har skubbet dine ændringer op til frontend styleguiden, vil der gå noget tid før de kommer på selve frontend styleguidens hjemmeside. Selve hjemmesiden bliver nemlig kun fornyet en gang imellem, hvor den der tager alle ændringerne der er blevet lavet, siden sidst den blev fornyet. Vær derfor tålmodig, og hvis du er i tvivl om dine ændringer er blevet skubbet op til frontend styleguiden, kan du gå ind på følgende link, for at se om din "Commit"-besked kan ses:

https://github.com/jonasjensen77/frontend-styleguide-poc/commits/master

Hvis ikke så følg instruktionerne under kapitlet *Skub dine ændringer op på frontend styleguiden*.



