---
type: component
title: Typesetting
parent: typography
order: 07
---

<!-- Typsetting section begin -->

{% include code/preview.html component="typesetting" %}
{% include code/accordion.html component="typesetting" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="typesetting-docs-tech">
    Implementation
  </button>
  <div id="typesetting-docs-tech" aria-hidden="true" class="accordion-content">
    <p>For at give en max-bredde på 75 karaktere skal brødteksten være placeret inde i et html-element som har klassen <code>.content</code></p>
    <p>Bredden er styret af variablen <code>$text-max-width</code> in <code>src/stylesheets/core/<wbr>_variables.scss</code>.</p>
  </div>
</div>

<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="typesetting-docs">
    Dokumentation
  </button>
  <div id="typesetting-docs" class="accordion-content">

  </div>
</div>
