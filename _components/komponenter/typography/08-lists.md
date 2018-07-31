---
type: component
title: Lister
parent: typography
order: 07
---

<!-- Lists section begin -->

{% include code/preview.html component="lists" classes="preview-lists" %}
{% include code/accordion.html component="lists" %}

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="lists-docs-tech">
    Implementering
  </button>
  <div id="lists-docs-tech" aria-hidden="true" class="accordion-content">
    <p>For at lave en liste uden styling kan enten klassen <code>.unstyled-list</code> benyttes eller et mixin <code>@include unstyled-list;</code>.</p>
  </div>
</div>

<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="list-docs">
    Dokumentation
  </button>
  <div id="list-docs" class="accordion-content">
    
  </div>
</div>
