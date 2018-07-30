---
title: Generel skjul og vis indhold funktionalitet
parent: Collapse
order: 03
lead: 
---

{% include code/preview.html component="basic-collapse" %}
{% include code/accordion.html component="basic-collapse" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="collapse-tech">
    Implementering
  </button>
  <div id="collapse-tech" aria-hidden="false" class="accordion-content">
    <p>For at initializere collapse funktionaliteten skal et HTML-element have klassen <code>.js-collapse</code>. Collapse/expand funktionaliteten bliver nu kaldt når man klikker på dette element.</p>
    <p>Dette HTML-element skal yderligere have følgende attributter:</p>
    <ul>
      <li><code>data-js-target="#id-of-target-to-collapse"</code>. Der henføres her til det element som skal collapses/expandes. </li>
      <li><code>aria-expanded="true/false". </code></li>
      <li><code>aria-controls="id-of-target-to-collapse" </code></li>
    </ul>
    <p>Det element som skal collapses/expanded skal have følgende:</p>
    <ul>
      <li><code>id=”id-of-target-to-collapse”</code></li>
      <li><code>aria-hidden="true/false"</code></li>
    </ul>
  </div>
</div>
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="collapse-docs">
    Dokumentation
  </button>
  <div id="collapse-docs" class="accordion-content">
    
  </div>
</div> 