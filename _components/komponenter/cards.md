---
permalink: /designandcode/cards/
layout: styleguide
type: component
title: Cards
category: UI components
subcategory: Design og kode 
lead: A card is a sheet of material that serves as an entry point to more detailed information.
---

{% include code/preview.html component="cards" %}
{% include code/accordion.html component="cards" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="code-documentation">
    Implementering
  </button>
  <div id="code-documentation" class="accordion-content">
    <p>Alle cards har en <code>.card</code> class. Cards kan bestå af en header, et tekstområde, et contentområde og et aktionområde. Der er ingen specifik rækkefølge af områder og de kan derfor sammensættes efter eget behov og i alle størrelser. Der skal dog overholdes, hvad der bliver placeret i de forskellige områder. Hver område er beskrevet nedenfor. </p> 
    <h5>Header</h5>
    <p>Headeren har en <code>.card-header</code> class, og indeholder en titel og en understøttende tekst, som alle er p-tags med hver deres class.</p>
    <ul>
      <li><code>.header-titel</code></li>
      <li><code>.subheader</code></li>
    </ul>
    <h5>Tekstområde</h5>
    <p>Tekstområdet har en <code>.card-text</code> class, og indeholder brødtekst, som har en class.</p>
    <ul>
      <li><code>.text</code></li>
    </ul>
    <h5>Contentområde</h5>
    <p>Contentområdet har en <code>.card-content</code> class, og kan indeholde brødtekst og andet, såsom displaytekst og grafer, der har hver deres div med hver deres class. <code>.card-content</code> har en stribet baggrundsfarve, denne baggrundsfarve er midlertidig og vises kun for at indikere contentområdet. For at se hvilke andre baggrundsfarver der kan bruges, se på "Baggrundsfarver" under "Hjælpefunktioner" i sidenavigationen. Det er også muligt at tilføje andre farver.</p> 
    <ul>
      <li><code>.content-text</code></li>
      <li><code>.content</code></li>
    </ul>
    <h5>Aktionsområde</h5>
    <p>Aktionsområdet har en <code>.card-action</code> class, kan indeholde brødtekst, knapper, links og funktionelle link, som alle har hver deres div med hver deres class.</p>
    <ul>
      <li><code>.action-content</code></li>
      <li><code>.action-buttons</code></li>
      <li><code>.action-links</code></li>
    </ul>
  </div>
</div>

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="alert-docs">
    Brugervenlighed
  </button>
  <div id="alert-docs" aria-hidden="false" class="accordion-content">
   
  </div>
</div>