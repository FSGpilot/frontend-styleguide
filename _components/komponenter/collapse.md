---
permalink: /designandcode/collapse/
layout: styleguide
type: component
title: Collapse
category: UI components
subcategory: Komponenter
lead: Collapse and expand content.
---

{% include code/preview.html component="collapse" %}
{% include code/accordion.html component="collapse" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="label-docs">
    Documentation
  </button>
  <div id="label-docs" aria-hidden="false" class="accordion-content">
    <h4>Implementation</h4>
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
