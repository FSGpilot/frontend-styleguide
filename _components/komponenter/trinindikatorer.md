---
permalink: /designandcode/trinindikatorer/
layout: styleguide
type: component
title: Trinindikatorer
category: UI components
subcategory: Design og kode
lead:
---

{% include code/preview.html component="tringuide" %}
{% include code/accordion.html component="tringuide" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="trin-code-documentation">
    Implementering
  </button>
  <div id="trin-code-documentation" class="accordion-content">
    <p class="h5">Trinindikator</p>
    <ul class="content-list">
      <li>For en klikbar trinindikator bruges <code>.sidenav-list</code> klassen på ul elementet.</li>
      <li>For en tvunget trinindikator bruges <code>.sidenav-list-locked</code> klassen på ul elementet.</li>
    </ul>
    <p class="h6">Aktivt og overstået trin i trinindikator</p>
    <ul class="content-list">
      <li>Teksten i det aktive menupunkt bliver styret af primærfarven, som sættes med variablen <code>$color-primary</code></li>
      <li>Det aktive menupunkt skal have klassen <code>.active</code>.</li>
      <li>For at indikere et overstået trin, kan der indsættet et ikon med klassen <code>.sidenav-icon</code>. Dette ikon er sat til højre i trinet.</li>
    </ul>
    <p class="h6">Tilføj ikon i tringuide</p>
    <ul class="content-list">
      <li>For at tilføje et ikon til ventre i tringuiden bruges klassen <code>.sidenav-icon-before</code>.</li>
    </ul>
    <p class="h6">Tilføj information i tringuide</p>
    <ul class="content-list">
      <li>For at tilføje information til et trin bruges klassen <code>.sidenav-information</code>.</li>
    </ul>
    <p class="h6">Trinindikatoren kan indlejres i en dropdown. Der er her to valgmuligheder:</p>
    <ul>
      <li>På alle skærmstørrelser er trinindikatoren indlejret i dropdownen. Dette kræver blot at trinindukatoren placeret inde i <code>.overflow-menu-inner</code> kontaineren. Dette er vist i ekssemplet "Trinindikator i overflow-menu".</li>
      <li>Hvis man ønsker at få vist trinindikatoren på større skærme, men at den bliver vist i en dropdown på mindre skærme, skal <code>.overflow-menu </code> have klassen <code>.overflow-menu--md-no-responsive</code>. Dette er vist i eksemplet "Trinindikator - responsivt i overflow-menu".</li>
    </ul>
  </div>
</div>
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="trin-documentation">
    Dokumentation
  </button>
  <div id="trin-documentation" aria-hidden="false" class="accordion-content">
  </div>
</div>
