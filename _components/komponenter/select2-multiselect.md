---
permalink: /designandcode/select2-multiselect/
layout: styleguide
type: component
title: Multiselect dropdown
category: UI components
subcategory: Design og kode
lead: Gør det muligt for brugeren at vælge flere elementer fra en liste.
---

<div class="alert alert-info alert--paragraph" role="alert" aria-label="Bruger ekstern script informationsboks">
  <div class="alert-body">
    <h3 class="alert-heading">Kræver speciel implementering</h3>
    <p class="alert-text">
      Multiselect gør brug af et eksternt bibliotek som skal inkluderes ud over standard filerne til Frontend Styleguiden, se implementeringsafsnittet nedenfor.  
    </p>
  </div>
</div>

{% include code/preview.html component="select2-multiselect" %}
{% include code/accordion.html component="select2-multiselect" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="accordion-bordered-docs">
   Implementering
  </button>
  <div id="accordion-bordered-docs" aria-hidden="true" class="accordion-content">
    <p>Multiselect funktionaliteten bygger på biblioteket <a href="https://github.com/woocommerce/selectWoo">SelectWoo</a>, som er en tilgængelig implementering af det populære bibliotek <a href="https://select2.org/">Select2</a>.</p>
    <p>Det må antages at det er et begrænset antal selvbetjeningsløsninger som har brug for denne funktionalitet, derfor er dette bibliotek ikke inkluderet i standard javascript filen <code>dkwds.js</code>. En udvikler skal derfor selv inkludere de nødvendige filer for at få SelectWoo til at virke. Select2's <a href="https://select2.org/getting-started/installation">guide</a> kan bruges til opsætningen, dog skal SelectWoo's javascript filer bruges i steden for. Det er vigtigt at både javascript filer, og styling filer bliver inkluderet.</p>
    <p>På dette dokumentationssite er multiselect funktionaliteten en del af javascript filen <code>dkwds-vendor-examples.js</code>, denne fil har kun til formål at vise funktionaliteten på dette dokumentationsite, og skal ikke inkluderes i selve selvbetjeningsløsningen.</p>
    <p>Eksemplet på denne side er implmenteret her: <code>[Stil til komponent biblioteket]/src/js/components-vendor-examples/select2-examples.js</code></p>
  </div>
</div>


<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="multiselect-docs">
    Brugervenlighed
  </button>
  <div id="multiselect-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
