---
permalink: /designandcode/tooltip/
layout: styleguide
type: element
title: Tooltip
category: UI components
subcategory: Design og kode
lead: 
---

{% include code/preview.html component="tooltip" %}
{% include code/accordion.html component="tooltip" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="code-label-docs">
    Kode dokumentation
  </button>
  <div id="code-label-docs" aria-hidden="false" class="accordion-content">
    <h4>Implementation</h4>
    <p>Tooltips  bygger på <a href="https://atomiks.github.io/tippyjs/">tippy.js.</a></p>
    <p>For at initializere et tooltip skal et HTML-element have klassen ’. js-tooltip’ og en ’title’-attribut:</p>
    <div class="code-highlight">
      <code>
        &lt;button class="button button-primary js-tooltip" title="Dette er et tooltip"&gt;Knap med tooltip&lt;/button&gt;	
      </code> 
    </div>
    <p>Tippy.js har mange konfigurationsmuligheder, og den fulde liste kan ses på deres hjemmeside: <a href="https://atomiks.github.io/tippyjs/">https://atomiks.github.io/tippyjs/</a></p>
    <p>I følgende eksempel er tooltippet konfigureret til at vises til venstre: </p>
    <div class="code-highlight">
      <code>
        &lt;button class="button button-primary js-tooltip" data-tippy-placement="left" title="Tooltip til venstre"&gt;Knap med tooltip til venstre&lt;/button&gt;
      </code>
    </div>
  </div>
</div>
