---
permalink: /designandcode/accordions/
layout: styleguide
type: component
title: Accordions
category: UI components
subcategory: Design og kode
lead: Accordions are a list of headers that can be clicked to hide or reveal additional content.
---

{% include code/preview.html component="accordion" %}
{% include code/accordion.html component="accordion" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="true" aria-controls="documentation">
    Brugervenlighed
  </button>
  <div id="documentation" class="accordion-content">
    
  </div>
</div>