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
    <ul class="content-list">
      <li>For en klikbar trinindikator bruges <code>.sidenav-list</code> klassen på ul elementet.</li>
      <li>For en tvunget trinindikator bruges <code>.sidenav-list-locked</code> klassen på ul elementet.</li>
      <li>Teksten i det aktive menupunkt bliver styret af primærfarven, som og sættes med variablen <code>$color-primary</code></li>
      <li>Det aktive menupunkt skal have klassen <code>active</code>.</li>
    </ul>
    <p>Trinindikatoren kan indlejres i en dropdown. Der er her to valgmuligheder:</p>
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
