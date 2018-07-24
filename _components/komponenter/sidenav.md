---
permalink: /designandcode/sidenav/
layout: styleguide
type: component
title: Sidenavigation
category: UI components
subcategory: Design og kode
lead: "Hierarchical, vertical navigation to place at the side of a page."
---
<h2>Sidenavigation</h2>
{% include code/preview.html component="sidenav--compare" %}
{% include code/accordion.html component="sidenav--compare" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="sidenav-docs">
    Dokumentation
  </button>
  <div id="sidenav-docs" aria-hidden="false" class="accordion-content">
    <h4>Implementation</h4>
    <ul>
      <li>Alle aktive menupunkter skal være semibold og sættes med variablen <code>$font-weight-semibold</code></li>
      <li>Teksten i det aktive menupunkt skal være primærfarven, som og sættes med variablen <code>$color-primary</code></li>
      <li>Aktive menupunkter skal have en <code>.current</code> class, som gør teksten semibold</li>
      <li>Kun det sidste aktive menupunkt skal i stedet have en <code>.active</code> class, der udover at være semibold, har en border i venstre side, som bliver sat med variablen <code>$sidenav-active-border-width</code></li>
      <li>På hover skal baggrundsfarven og teksten på trinene skifte, her skal variablen <code>$color-gray-pale</code>bruges til baggrunden og variablen<code>$color-link-hover</code> bruges til teksten</li> 
    </ul>
  </div>
</div>

<h2>Sidenavigation - responsive</h2>
{% include code/preview.html component="sidenav--responsive" %}
{% include code/accordion.html component="sidenav--responsive" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="sidenav-docs">
    Dokumentation
  </button>
  <div id="sidenav-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Responsivt kan man vælge mellem to tilgange:</p>
    <ul>
      <li>På små skærme bliver menuen skjult og der vises i stedet en knap. Det er collapse funktionaliteten der benyttes.</li>
      <li>Sidemenuen er indsat i en overflow-menu. På små skærme skal overflow menuen dog have samme adfærd som collapse-funktionaliteten, altså at indholdet under dropdownen skubbes nedad når menuen åbnes. For at gøre dette skal klassen <code>.js-dropdown--responsive-collapse</code> tilføjes til samme element som har klassen<code>.js-dropdown</code>.</li>
    </ul>
  </div>
</div>