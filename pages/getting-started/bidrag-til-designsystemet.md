---
permalink: /getting-started/bidrag-til-designsystemet/
layout: styleguide
title: Bidrag til designsystemet
category: Getting started
lead: Du vil her kunne finde forskellige guides til hvordan man kan komme i gang med at bidrage til frontend styelguiden, både som programmør og som ikke-koder. 
subnav:
- text: Bidrag som ikke-koder
  href: '#bidrag-til-styleguiden-uden-kendskab-til-kode'
- text: Markdown tutorial
  href: '#markdown-med-typora---begynderguiden'
- text: Bidrag som programmør
  href: '#bidrag-til-frontstyleguiden-som-programmør'
- text: Opsætning af frontend styleguide server
  href: '#sæt-din-computer-op-til-at-kunne-starte-frontend-styleguiden-lokalt'
---

## Bidrag til styleguiden uden kendskab til kode

Denne guide er for dig som ingen kendskab til kode har, men stadigt vil bidrage til frontend styleguiden.
Guiden vil hjælpe dig igennem - step for step - hvordan du opsætter din computer til at kunne bidrage.

### Hvad kan du bidrage med?
Man skal bestemt ikke kunne kode for at bidrage til frontend styleguiden. Faktisk er størstedelen af styleguiden bygget op af simple tekstsider, der dokumenterer alle de gode råd og regler man bør følge når man skal opbygge en ny underside til f.eks. borger.dk eller virk.dk. Disse tekstsider er alle skrevet af ikke-kodere, og du kan nemt være med til at tilføje dine gode råd og regler til disse sider, så styleguiden kan blive endnu bedre og mere præcis.

#### Tekstsidernes opbygning
Tekstsiderne er skrevet med noget der hedder "Markdown", som er næsten ligesom at skrive et almindeligt word-dokument. Når du har skrevet dit Markdown-dokument og lægger det op på frontend styleguiden, bliver det automatisk omdannet til en præsentabelt side på frontend styleguidens hjemmeside. F.eks. er denne side skrevet med Markdown, så nemt er det! 

#### Kom i gang med at skrive Markdown
Markdown er en simpel måde at skrive pæne tekster til hjemmesider, og skrives som en almindelig tekst blot tilsat nogle få specielle karakterer som * eller #, der bestemmer hvordan teksten skal se ud.

Man kan med markdown for eksempel skrive en overskrift ved at sætte et # ind foran teksten, og således bliver "# Dette er en overskrift", lavet automatisk om til: 

# Dette er en overskrift

At lære de forskellige tegn at kende kan være besværligt, dog for at gøre det nemt er der opfundet et simpelt skriveprogram, typora, hvor du ikke behøver disse tegn. 

Programmet kan hentes på <https://typora.io/> og vil blive brugt fremmadrettet i guiden.

Du kan let komme i gang med Markdown og Typora med følgende guide: <a href="{{site.baseurl}}/getting-started/bidrag-til-designsystemet/#markdown-med-typora---begynderguiden">Markdown med Typora - Begynderguiden</a>

### Sæt din computer op til styleguiden

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
   <https://github.com/jonasjensen77/frontend-styleguide-poc.git>
3. Klik på næste boks, hvorefter resten af felterne vil udfylde sig selv
4. Lad felterne være som de er, og tryk på "Clone"-knappen
5. Vent til handlingen er afsluttet. Du har nu hentet frontend styleguiden ned.

### Skab dit bidrag til frontend styleguiden

Når du har hentet frontend styleguiden, kan du frit lave ændringer i de sider de har lyst til. Da du "clonede" tidligere, blev frontend styleguiden lagt ind i en mappe, der i de fleste tilfælde har lagt sig i din dokumenter-mappe. Frontend styleguide-mappen du leder efter hedder noget med *frontend-styleguide-poc*, og inde i den finder du en masse forskellige filer og mapper. Selvom det kan se uoverskueligt ud, skal du ikke blive skræmt, da du som ikke-koder kun skal fokusere på mapperne *_components* og *pages*. I disse to mapper vil der ligge utalige markdown filer, (Bemærk at filer der slutter på .md er markdown filer) som hver især svarer til en underside på frontend styleguidens hjemmeside. Et par forskellige markdown dokumenter du f.eks. kan åbne for at se hvordan det ser ud i Typora, ligger i *_components*-mappen efterfulgt af *fundament*-mappen:

1. **layout.md** svarer til følgende side: 
    <https://jonasjensen77.github.io/frontend-styleguide-poc/components/fundament/layout/?s=undefined>
2.  **touch.md** svarer til følgende side: 
    <https://jonasjensen77.github.io/frontend-styleguide-poc/components/fundament/mobile/?s=undefined>

Når du åbner disse filer, har du mulighed for at ændre i dem med Typora. Når du er færdig med dine ændringer og er tilfreds med dem, har du mulighed for at lægge dem op på den officielle frontend styleguide.

#### Skub dine ændringer op på frontend styleguiden
Når du har lavet en ændring i en af frontend styleguidens dokumenter, og den er klar til at blive en del af den officielle frontend styleguide, skal du åbne programmet Sourcetree. Herfra skal du gå gennem følgende skridt:
1. Tryk på "Commit"-knappen oppe i toppen af sourceTree.
2. Du burde her kunne se navnet på dit ændrede dokument under ”Unstaged files”
3. Klik på dokumentet og vælg ”Stage Selected”
4. I boksen nede under dit navn, skal du specificere en ”Commit"-besked 
    1. En ”Commit”-besked er en kort beskrivelse af hvad du har ændret på. I denne besked bør du skrive navnet på filen du har ændret i, og kort hvilke ændringer du har lavet. Alle ”Commit”-beskeder bliver lagt sammen i en liste, så man kan følge med i hvad de seneste ændringer er på frontend styleguiden.
5. Tryk på "Commit"-knappen nede til højre
6. Du har nu officielt godkendt dine ændringer, men de er endnu ikke blevet blevet lagt op online. Dog før dine ændringer lægges op online, skal du sikre dig at de seneste ændringer kommer ned til dig først. Derfor skal du nu trykke på knappen "Pull" og trykke på "ok" uden at ændre noget. 
7. Nu vil de seneste ændringer fra frontend styleguiden komme ned på din computer, og du kan nu trykke på ”Push”-knappen efterfulgt af ”push”, for at lægge dine egne ændringer op og blive en del af den seneste frontend styleguide

Dine ændringer er nu lagt op på frontend styleguiden!

### Spørgsmål
#### Hvorfor kan jeg ikke se min bidragelse på den officielle frontend styleguide hjemmeside?
Selvom du har skubbet dine ændringer op til frontend styleguiden, vil der gå noget tid før de kommer på selve frontend styleguidens hjemmeside. Selve hjemmesiden bliver nemlig kun fornyet en gang imellem, hvor den der tager alle ændringerne der er blevet lavet, siden sidst den blev fornyet. Vær derfor tålmodig, og hvis du er i tvivl om dine ændringer er blevet skubbet op til frontend styleguiden, kan du gå ind på følgende link, for at se om din "Commit"-besked kan ses:

<https://github.com/jonasjensen77/frontend-styleguide-poc/commits/master>

Hvis ikke så følg instruktionerne under kapitlet *Skub dine ændringer op på frontend styleguiden*.


## Markdown med Typora - Begynderguiden

Denne guide vil hjælpe dig i gang med at skrive Markdown med programmet Typora. Typora kan hentes på <https://typora.io/>

At skrive Markdown med Typora minder meget om at skrive et simpelt word-dokument, blot med færre funktionaliteter end hvad word tilbyder. Start med at åbne Typora.

Du vil nu blive mødt af et nyt tomt dokument, og vi er klar til lære Typora at kende.

![]({{site.baseurl}}/img/docsimages/empty-typora-docs.png)

Start med at skrive "Hej Verden" og tryk på CTRL + s på dit tastatur eller på fanen "file" efterfulgt af "save" for at gemme dit markdown-dokument. 

Du har nu gemt dit allerførste markdown dokument og kan nu skabe dine egne markdown-dokumenter fremover. Nu er det tid til at gå i dybden med de forskellige muligheder man kan med markdown og Typora.

### Brug Typoras funktioner

Som sagt kan Typora ses lidt ligesom word. Hvis du vil ændre din tekst, skal du klikke et sted oppe i toppen. Forskellen mellem word og Typora er dog, at hvor du i word kan klikke på forskellige ikoner for at ændre på teksten, skal du i Typora vælge dine tekstændringer ved at tykke på de forskellige drop-down menuer. Hvis du kigger i toppen af Typora er der forskellige menuer at vælge imellem.

![]({{site.baseurl}}/img/docsimages/typora-menus.png)

Menuerne *paragraph* og *format* er dem vi kommer til at bruge mest, da det er disse som bruges til at ændre teksten til f.eks. at være en overskrift, fed, kursiv, osv. Lad os først prøve at lave den største overskrift man kan. En overskrift kaldes en header i markdown og i markdown kan man lave op til seks forskellige størrelser af headers. Markér "Hej verden" og tryk på *paragraph > Heading 1*. Din tekst vil nu ændre sig til en stor overskrift. Du kan vælge forskellige størrelser af overskrifter ved at klikke på de forskellige *Headings* under *paragraph*. 

Ved at vælge forskellige ændringer til dine tekster under de forskellige menuer, kan du opbygge et hurtigt og pænt markdown-dokument. Dog kan det godt være besværligt at skulle klikke på menuerne i toppen hver gang en ændring skal laves, men heldigvis fungerer Typora virkelig godt med tastatur-genveje. Disse genveje kan findes når man klikker på de forskellige menuer. Ved siden af de fleste af mulighederne kan man se en genvej skrevet med en lys-grå farve. F.eks. hvis man vil lave en hurtig *Heading 3* kan man i stedet for at finde *Heading 3* under *paragraph*, blot trykke på CTRL + 3. 

![]({{site.baseurl}}/img/docsimages/typora-open-paragraph.png)


Selvom det kan være svært at lære alle genvejene udenad, vil du hurtigt finde dig selv bruge dem til de meste almindelige ting som overskrifter, fed, kursiv og understreget tekst. 

Typora har en masse forskellige måder at ændre teksten på, og her en liste med nogle af dem:

1. Overskrifter
2. Fed, kursiv og understeget tekst
3. Matematik-tekst
4. Kode-blocks
5. Citater
6. Tabeller
7. Lister
8. Horizontale skillelinjer
9. Indholdsfortegnelse
10. Links 
11. Billeder
12. Opgavelister

Hvis du vil se nogle eksempler på markdown-dokumenter kan du kigge på følgende tre links som er skrevet til US Web Design Standards:

1. <https://github.com/18F/web-design-standards/blob/develop/README.md>
2. <https://github.com/18F/web-design-standards/blob/develop/RELEASE.md>
3. <https://github.com/18F/web-design-standards/blob/develop/LICENSE.md>

God skrivning!


## Bidrag til frontstyleguiden som programmør
*Kommer snart...*


## Sæt din computer op til at kunne starte frontend styleguiden lokalt
*Kommer snart...*