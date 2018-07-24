---
permalink: /designandcode/trinindikatorer/
layout: styleguide
type: component
title: Trinindikatorer
category: UI components
subcategory: Komponenter
lead: "Der findes tre varianter af tringuides: den tvungne, den klikbare og den betingede tringuide. De to første er designmæssigt identiske, og adskiller sig kun ved at brugeren med den tvungne tringuide begrænses fra at trykke på menupunkter, der ikke ligger i direkte forlængelse af det aktuelle trin. Trinindikatoren fortæller både, hvor langt brugeren er kommet i forløbet, og om de enkelte trin er godkendt eller ej.

Det er et bærende princip for trinindikationen, at brugeren orienterer sig vertikalt nedad, ligesom siderne i en tringuide bør designes, så brugeren bevæger sig nedad siden, der sagtens kan være længere end det område, der umiddelbart vises på skærmen."
---

{% include code/preview.html component="tringuide" %}
{% include code/accordion.html component="tringuide" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="sidenav-docs">
    Documentation
  </button>
  <div id="sidenav-docs" aria-hidden="false" class="accordion-content">
  <h4 class="heading">Implementering</h4>
    <ul class="content-list">
      <li>For en klikbar trinindikator bruges <code>.sidenav-list</code> class på ul elementet.</li>
      <li>For en tvunget trinindikator bruges <code>.sidenav-list-locked</code> class på ul elementet.</li>
      <li>Teksten i det aktive menupunkt skal være semibold og sættes med variablen <code>$font-weight-semibold</code></li>
      <li>Teksten i det aktive menupunkt skal være primærfarven, som og sættes med variablen <code>$color-primary</code></li>
      <li>Det aktive menupunkt skal have en .active class, der har en border i venstre side, som bliver sat med variablen <code>$sidenav-active-border-width</code></li>
      <li>På hover skal baggrundsfarven og teksten på trinene skifte, her skal variablen <code>$color-gray-pale</code>bruges til baggrunden og variablen<code>$color-link-hover</code> bruges til teksten</li> 
    </ul>
    <h4 class="heading">Krav</h4>
    <ul class="content-list">
      <li>Krav til størrelse af knapper mv. fremgår af HTML/CSS, som kan downloades ovenfor</li>
      <li>Krav til placering på siden fremgår af den eksemplariske løsning</li>
      <li>Tvungen tringuide skal altid have forrige-næste knapper</li>
      <li>Man behøver ikke bruge tringuide til løsninger med tre trin eller derunder, da det kan give brugerne problemer med at afkode, hvilket trin de er på. Alle oplysninger kan i stedet samles på én side og en af sidetyperne uden tringuide anvendes.</li>
      <li>Der skal udvikles en logik, der holder styr på, hvilke trin brugeren har besøgt, og validerer om trinnet er afsluttet eller har mangler. Man kan validere ud fra flere forskellige faktorer. Der kan f.eks. valideres på, om de obligatoriske informationer på et trin er udfyldt og valideret korrekt. Der skal altid skrives fortløbende numre ud for trinene for at tydeliggøre for brugeren, at venstrenavigationen er en trinindikation. På små skærme skal det af en drop down-knap fremgå, hvilket trin brugeren er på. Knapteksten skal altid være ’Trin x af x’, hvor der skal udvikles logik til at skrive både det aktuelle trin og det samlede antal trin. Kvitteringer indgår ikke i antallet af trin</li>
    </ul>
    <h4 class="heading">Anvendelse</h4>
    <ul class="content-list">
      <li>Tvungen tringuide bruges, hvor brugeren forventes at have alle oplysninger i forvejen, og hvor brugeren kan gennemføre og afslutte indberetningen i et kortvarigt og sammenhængende forløb</li>
      <li>Meget komplekse løsninger kan evt. opdeles på flere og mindre løsninger, som hver for sig er egnede til den tvungne tringuide</li>
      <li>Skal det være muligt for brugeren at udfylde løsningen delvist for senere at vende tilbage og udfylde resten på et mere oplyst grundlag, anbefales det at bruge den klikbare tringuide</li>
    </ul>
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Ensure the side navigational system is keyboard accessible. Users should be able to tab through each link.</li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>To display a navigational hierarchy with one to three levels.</li>
      <li>To display the “sub-navigation” within a section of the website.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>If the site has fewer than five pages, consider organizing the page without a navigational hierarchy.</li>
      <li>If your page already has a horizontal and vertical navigation bar, consider ways to simplify your navigation system.</li>
      <li>If your content is within a frame or sub-area of a page, consider ways to simplify your navigation system.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Indicate where a user is within the navigational hierarchy. Use the “active” state to show users which page they have navigated to.</li>
      <li>Keep the navigation links short. They can be shorter derivatives of page titles themselves.</li>
      <li>If the navigation hierarchy is too long, users may miss items at the bottom. If it’s too deep, users may miss items that require too many clicks. Usability test to find the right balance between breadth and depth.</li>
    </ul>
  </div>
</div>
