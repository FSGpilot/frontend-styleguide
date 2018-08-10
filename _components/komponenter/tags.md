---
permalink: /designandcode/tags/
layout: styleguide
type: element
title: Tags
category: UI components
subcategory: Design og kode
lead: 
---

{% include code/preview.html component="tags" %}
{% include code/accordion.html component="tags" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="tags-code-documentation">
    Implementering
  </button>
  <div id="tags-code-documentation" class="accordion-content">
    <p>Der er to eksempler på hvordan tags kan se ud. Ét uden ikon og ét med ikon.</p>
    <p>Alle tags skal have en <code>.tag</code> class <code>&lt;button&gt;&lt;/button&gt;</code> elementet. Hvis et tag skal have ikon, skal der yderligere tilføjes en <code>.tag-icon</code> class.</p>
    <p>Et tag vil se følgende ud:</p>
    <ul>
      <li><code>&lt;button class="tag"My tag&lt;/button&gt;</code></li>
    </ul>
    <p>Et tag med ikon vil se følgende ud:</p>
    <ul>
      <li><code>&lt;button class="tag tag-icon"My tag&lt;/button&gt;</code></li>
    </ul>
  </div>
</div>
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="accordion-bordered-docs">
    Brugervenlighed
  </button>
  <div id="accordion-bordered-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
