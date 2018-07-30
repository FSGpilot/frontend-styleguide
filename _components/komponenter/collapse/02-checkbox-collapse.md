---
title: Checkbox - skjul og vis inhold
parent: Collapse
order: 02
lead: 
---

{% include code/preview.html component="checkbox-toggle-content" %}
{% include code/accordion.html component="checkbox-toggle-content" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="checkbox-toggle-content-tech">
    Implementering
  </button>
  <div id="checkbox-toggle-content-tech" aria-hidden="false" class="accordion-content">
    <p>For at initializere collapse funktionaliteten på en checkbox skal <code>input[type=checkbox]</code> have følgende:</p>
    <ul>
      <li>Klassen <code>'js-checkbox-toggle-content'</code>. Denne klasse gør at funktionaliteten bliver initializeret. </li>
      <li>Attributten <code>data-js-target="id-of-target-to-collapse"</code>: denne attribute skal have id'et på det element som skal vises på checkboxen er aktiveret. </li>
      <li>Hvis man ønsker at checkboxen skal være valgt fra starten af, skal den have attributten <code>'checked'</code>.</li>
      <li><code>aria-controls="id-of-target-to-collapse" </code></li>
    </ul>
    <p>Det element som skal collapses/expandes skal have følgende:</p>
    <ul>
      <li><code>id=”id-of-target-to-collapse”</code></li>
      <li><code>aria-hidden="true/false"</code></li>
    </ul>   
  </div>
</div>
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="checkbox-toggle-content-docs">
    Dokumentation
  </button>
  <div id="checkbox-toggle-content-docs" class="accordion-content">
    
  </div>
</div>