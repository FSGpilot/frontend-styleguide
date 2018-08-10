---
type: component
title: Labels
parent: typography
order: 03
---

<p>I eksemplet nedenfor viser vi hvordan overskrifter til inputfelter og overskrifter i tabeller ser ud. De er ens, men der er forskel i koden, og derfor viser vi to labels i eksemplet.</p>

{% include code/preview.html component="labels" %}
{% include code/accordion.html component="labels" %}

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="labels-docs-tech">
    Implementering
  </button>
  <div id="labels-docs-tech" aria-hidden="true" class="accordion-content">
    <p>Feltoverskrifter kan indsættes med et label-tag <code>&lt;label&gt;&lt;/label&gt;</code> og ved label klassen <code>.form-label</code></p>
    <p>Kolonneoverskrifter bruges i tabeller og indsættes som <code>&lt;th&gt;&lt;/th&gt;</code> i en thead. Kolonneoverskrifter skal hverken have label-tag eller label klasse.</p>
  </div>
</div>
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="labels-docs">
    Brugervenlighed
  </button>
  <div id="labels-docs" class="accordion-content">
    
  </div>
</div>
