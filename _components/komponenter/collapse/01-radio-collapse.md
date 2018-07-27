---
title: Radioknap - skjul og vis inhold
parent: Collapse
order: 01
lead: 
---

{% include code/preview.html component="radio-toggle-content" %}
{% include code/accordion.html component="radio-toggle-content" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="radio-toggle-content-tech">
    Implementation
  </button>
  <div id="radio-toggle-content-tech" aria-hidden="false" class="accordion-content">
    <p>For at initializere collapse funktionaliteten på en radioknap skal <code>input[type=radio]</code> have følgende:</p>
    <ul>
      <li>Attributten <code>name</code>: alle radioknapper I en gruppe skal have samme værdi i 'name'-attributten. Derved kan kun én af radioknapperne være valgt af gangen.</li>
      <li>Attributten <code>data-js-target="id-of-target-to-collapse"</code>: denne attribute skal have id'et på det element som skal vises på radioknappen er aktiveret. </li>
      <li>Hvis man ønsker at radioknappen skal være valgt fra starten af, skal den have attributten <code>'checked'</code>.</li>
      <li><code>aria-controls="id-of-target-to-collapse" </code></li>
    </ul>
    <p>Alle radioknapperne i en gruppe skal placeres i en kontainer som har klassen <code>js-radio-toggle-group</code>.</p>
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
