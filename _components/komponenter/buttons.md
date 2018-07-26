---
permalink: /designandcode/buttons/
layout: styleguide
type: element
title: Knapper
category: UI components
subcategory: Design og kode
lead: 
---

{% include code/preview.html component="buttons" %}
{% include code/accordion.html component="buttons" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="code-documentation">
    Implementation
  </button>
  <div id="code-documentation" class="accordion-content">
      <p>Knap styling kan både sættes på &lt;button&gt; og &lt;a&gt; tags ved at tilføje følgende klasser:</p>
      <ul>
        <li><code>button button-primary</code></li>
        <li><code>button button-secondary</code></li>
        <li><code>button button-ghost</code></li>
        <li><code>button button-tertiary</code></li>
      </ul>
  </div>
</div>

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="accordion-bordered-docs">
    Dokumentation
  </button>
  <div id="accordion-bordered-docs" aria-hidden="false" class="accordion-content">
   
  </div>
</div>
