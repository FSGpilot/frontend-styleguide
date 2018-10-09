---
permalink: /designandcode/search/
layout: styleguide
type: component
title: Søgefelt
category: UI components
subcategory: Design og kode
lead: A block that allows users to search for specific content if they know what search terms to use or can’t find desired content in the main navigation
---

{% include code/preview.html component="search" classes="preview-search-bar" %}
{% include code/accordion.html component="search" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="search-code-documentation">
    Implementering
  </button>
  <div id="search-code-documentation" class="accordion-content">
    <h4>Søgefelt</h4>
    <p>Du kan styre søgefeltets bredde via input-width- og input-char- se mere under punktet formular elementer og input bredde og validering.</p>
    <p>Du bør som oftest implementere auto-suggest på søgefelter, så brugeren foreslås relevante søge ord/sætninger</p>
  </div>
</div>

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="search-bar-docs">
    Brugervenlighed
  </button>
  <div id="search-bar-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
