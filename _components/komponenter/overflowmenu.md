---
permalink: /designandcode/overflowmenu/
layout: styleguide
type: component
title: Overflow menu
category: UI components
subcategory: Design og kode
lead: Toggle overlay with lists of links or buttons.
---

{% include code/preview.html component="overflow-menu" %}
{% include code/accordion.html component="overflow-menu" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="overflow-docs">
    Implementering
  </button>
  <div id="overflow-docs" aria-hidden="false" class="accordion-content">
    <p>Følgende aria tags styrer hvorvidt menuen er foldet ud:</p>
    <ul>
      <li>Button: <code>aria-expanded="false"</code></li>
      <li>Overflow menu: <code>aria-hidden="true"</code></li>
    </ul>
    <p>Følgende klasser styrer i hvilken retning menuen skal folde ud:</p>
    <ul>
      <li>Venstre: <code>.overflow-menu--open-left</code></li>
      <li>Højre: <code>.overflow-menu--open-right</code></li>
    </ul>
    <p>Der er lavet et specifikt liste element til overflow-menuen (se <code>.overflow-list</code>) som kan indeholder links eller buttons. Det er dog ikke nødvendigt at benytte denne liste. Overflow-menuen er bare en container hvor man kan placere det indhold man nu har lyst til. I eksemplet ovenfor er en trin-guide indsat i overflow-menuen.</p>
    <h6>Javascript</h6>
    <p>Initializer collapse/expand javascript med at placere følgende på button elementet: <code>class="js-dropdown" data-js-target="#overflow1"</code>
    Elementet som skal collapses/expandes skal have et matchende id <code>id="overflow1"</code> (placeres på <code>.overflow-menu-inner</code>)</p>
  </div>
</div>
