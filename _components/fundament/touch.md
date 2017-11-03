---
permalink: /components/fundament/mobile/
layout: styleguide
title: Mobile First
category: UI components
subcategory: Partikler - Retningslinjer
lead: For at gøre offentlige selvbetjeningsløsninger brugbare på tværs af forskellige enheder og skærmstørrelser, kan man med fordel arbejde ud fra en ‘mobile first’ tankegang. Kort sagt går dette ud på, at ét og samme site fungerer på både smartphones, tablets, laptops og stationære computere. Den mest effektive måde at sikre tilgængelighed på tværs af enheder og skærmstørrelser, er at starte nedefra - heraf termet “mobile first”. 
order: 25
---

## DESIGN NEDE FRA OG OP 

Design og byg med omtanke for de værste betingelser helt fra starten - tag derfor udgangspunkt i den mindste skærmstørrelse, laveste processorkraft og værste forbindelse. Der vil unægteligt opstå problematikker, hvis der først tages højde for disse betingelser sent i processen. 

- Hvis indholdet loades med en rimelig hastighed på en enhed uden særlig processorkraft og med dårlig forbindelse, så loades den rimeligt overalt.
- Hvis indholdet kan vises fornuftigt og meningsfuldt på en helt lille skærm, så kan det vises fornuftigt og meningsfuldt på alle skærme.


## VÆR KNIVSKARP I DIN PRIORITERING

Mobile first tankegangen tvinger dig til at udvælge det indhold, som reelt bidrager kerneydelsen. På små skærme er der nemlig kun plads til det mest elementære indhold. Det er tilladt at tilføje mere indhold på større skærme, men løsningen skal tilbyde samme funktionalitet på alle skærmstørrelser. 

<div class="usa-grid-full">
    <div class="usa-width-one-third">
        <p><strong>Gør titel, svar og handling synlig på første side</strong></p>
    </div>
    <div class="usa-width-two-thirds">
        <img src="{{ site.baseurl }}/img/retningslinjer/dodont.png"
        style="">
    </div>
</div>

<div class="usa-grid-full">
    <div class="usa-width-one-third">
        <p><strong>Drop udenomssnak</strong></p>
    </div>
    <div class="usa-width-two-thirds">
        <img src="{{ site.baseurl }}/img/retningslinjer/dodont.png"
        style="">
    </div>
</div>

<div class="usa-grid-full">
    <div class="usa-width-one-third">
        <p><strong>Undgå tung grafik</strong></p>
    </div>
    <div class="usa-width-two-thirds">
        <img src="{{ site.baseurl }}/img/retningslinjer/dodont.png"
        style="">
    </div>
</div>

# Touch

Skab gennemtænkede mobile designs med nemme touch-flader, bevidsthed om hvordan brugere holder deres enheder og optimale interaktionsområder. 

## VÆR TOMMELFINGER-VENLIG

Sammenlignet med muse-interaktion, er nøjagtigheden med finger-interaktion nedsat betydeligt. For at gøre løsningen egnet til touch, skal størrelse, placering og afstand mellem interaktive elementer tilpasses en mere ‘klodset’ interaktion.

<img src="{{ site.baseurl }}/img/retningslinjer/dodont.png">

## Tilpasset til fingrene

<div class="usa-grid-full">
    <div class="usa-width-one-third">
        <img src="{{ site.baseurl }}/img/interaction-touch_loop3.gif" style="max-width: 200px;">
    </div>
    <div class="usa-width-one-half">
        <p>Touch hjælper brugere til nemt at forstå hvor de fysisk kan interagere med skærmen.</p>
    </div>
</div>

## Interaktioner

Folk trykker ofte med mere end en finger ad gang. Touch-interaktioner skal være uændrede lige meget antallet af fingre der berør skærmen.

Undgå interaktioner der kræver sammensatte bevægelser som double-tap eller press-and-hold interaktioner. De er ofte aktiveret ved uheld og er besværlige korrekt at indstille. 

<img src="{{ site.baseurl }}/img/gestures.PNG" style="max-width: 670px;">

## Feedback

Øg brugernes forståelse ved at give øjeblikkelig feedback når de trykker på skærmen. Interaktive elementer reagerer ved at skifte farve, størrelse eller ved bevægelse.

<img src="{{ site.baseurl }}/img/feedback.PNG" style="max-width: 670px;">

## Touch-flader

En veldesignet touch-oplevelse er afbalanceret i størrelse, mellemrum og visuelle elementer for at give brugeren bedre kontrol.

<div class="usa-grid-full">
  <div class="usa-width-one-third">
    <img src="{{ site.baseurl }}/img/touchpoint.gif">
  </div>
  <div class="usa-width-one-half">
    <ul class="usa-content-list">
      <li>
        Touch-skærme opfanger det geometriske centrum af en brugers berøringspunkt
      </li>
      <li>
       Brugere er upræcise i deres bevægelser.
      </li>
      <li>
        Touch-flader er ikke synlige og kan være større end det relaterede visuelle element.
      </li>
    </ul>
  </div>
</div>

<div class="usa-grid-full">
  <div class="usa-width-one-third">
    <img src="{{ site.baseurl }}/img/targets-grid.svg">
  </div>
  <div class="usa-width-one-half">
    <ul class="usa-content-list">
        <li>
            Ofte berørte områder bør have store touch-flader.
        </li>
        <li>
            Et brugergrænsefladeelement bør være mellem 60 og 100 procent af dets touch-område.
        </li>
        <!--<li>
            Sequential tasks, such as multi-delete, require additional space for precision.
        </li>-->
        <li>
            Gridsystemet sikrer tilstrækelig afstand mellem de forskellige elementer.
        </li>
    </ul>
  </div>
</div>

### Størrelse på Touch-flader

Der er ikke en perfekt størrelse til touch-flader. Forskellige størrelser passer til forskellige situationer. Handlinger der har stor betydning skal have tilhørende store touch-flader for at undgå utilsigtede tryk.

<div class="usa-grid-full">
  <div class="usa-width-one-third">
    <img src="{{ site.baseurl }}/img/targets-sizes.svg">
  </div>
  <div class="usa-width-one-half">
    <ul class="usa-content-list">
        <li>
            7 gange 7 mm er en god størrelse hvis et tryk på en forkert touch-flade kan korrigeres med få efterfølgende tryk.
        </li>
        <li>
            Ved 326 PPI, er 90 px svarende til 7 mm.
        </li>
    </ul>
  </div>
</div>

## Stillinger

Designing touch experiences requires knowledge of how the devices are held by different users. The user’s environment and physical comfort affect how long a grip is used and how often it’s changed.

For at designe gode touch-oplevelser kræves der viden om hvordan enhederne bliver holdt af forskellige brugere. Brugerens omgivelser og fysiske komfort påvirker hvordan brugeren holder fast i enheden og hvor lang tid der går før enheden rykkes på.   

<div class="usa-grid-full">
  <div class="usa-width-one-third">
    <img src="{{ site.baseurl }}/img/flip.gif">
  </div>
  <div class="usa-width-one-half">
    <ul class="usa-content-list">
        <li>
            Optimer brugergrænsefladen for forskellige måder at holde på.
        </li>
        <li>
            Tænk over hvordan landskabs- eller portrætvisning af din brugergrænseflade påvirker dit indhold.
        </li>
        <!--<li>
            Anchored thumbs increase touching accuracy. 
        </li>-->
        <!--<li>
            Touching top of screen might knock a docked device off balance 
        </li>-->
        <li>
            Elementer placeret i midten af skærmen kan være svære at nå.
        </li>
        <li>
            Ved interaktion fra en afstand reduceres læsbarheden og præcisionen. 
        </li>
    </ul>
  </div>
</div>

### Interaktionsområder

Tablets bliver oftest holdt i siderne hvilket gør de nederste hjørner ideelle for interaktive elementer. De fleste brugere holder en tablet med venstre hånd mens de trykker og navigerer med den højre. Placer altid de interaktive elementer inden for rækkevidde af tommelfingrerne. 

<img src="{{ site.baseurl }}/img/postures-interaction-area2.svg" style="max-width: 670px;">

### Læseområder

Indhold i den øverste halvdel af skærmen er nemmere at se end indhold på den nederste halvdel af skærmen, hvor det kan være skjult bag hænder eller ignoreret.

<img src="{{ site.baseurl }}/img/postures-interaction-area2.svg" style="postures-reading-area2.svg">

