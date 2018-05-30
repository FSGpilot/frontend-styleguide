---
permalink: /components/komponenter/tabnav/
layout: styleguide
type: component
title: Faneblade
category: UI components
subcategory: Komponenter
lead: "Horizontal navigation."
---
<h2>Faneblade</h2>
{% include code/preview.html component="tabnav" %}
{% include code/accordion.html component="tabnav" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="sidenav-docs">
    Documentation
  </button>
  <div id="sidenav-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <ul class="content-list">
      <li>Det aktive menupunkt skal være semibold og sættes med variablen <code>$font-weight-semibold</code></li>
      <li>Det aktive menupunkt skal have en <code>.active</code> class, som har en border-bottom, som bliver sat med variablen <code>$tabs-border-bottom</code></li>
      <li>Teksten og borderen på det aktive menupunkt skal være primærfarven, som og sættes med variablen <code>$color-primary</code></li>
      <li>Det aktive menupunkt skal have en <code>.active</code> class, der har en border-bottom, som bliver sat med variablen <code>$tabs-border-bottom</code></li>
      <li>På hover skal teksten på menupunktet skifte, her skal variablen <code>$color-link-hover</code> bruges. Derudover skal der tiføjes en border-bottom, som igen bliver sat med variablen <code>$tabs-border-bottom</code></li> 
    </ul>
  </div>
</div>