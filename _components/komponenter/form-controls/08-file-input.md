---
title: File input
parent: Form controls
maturity: alpha
order: 07
lead: A control that lets the user select a file.
---

{% include code/preview.html component="file-input" %}
{% include code/accordion.html component="file-input" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="date-input-docs">
    Dokumentation
  </button>
  <div id="date-input-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>We recommend using a native input using type="file", rather than a custom implementation.</p>
    <p>This is so:</p>
      <ul class="content-list">
      <li>the control gains focus when tabbing through the page</li>
      <li>the control functions using a keyboard</li>
      <li>the control functions using assistive technology</li>
      <li>the control functions when javascript is not available</li>
    </ul>
    <br>
    <p>A custom implementation of this control would need to meet the criteria above.</p>
  </div>
</div>
