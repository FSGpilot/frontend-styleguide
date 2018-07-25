---
type: component
title: Links
parent: typography
order: 07
---

<!-- Links section begin -->

<p class="font-lead">Links lead users to a different page or further information.
</p>

{% include code/preview.html component="links" %}
{% include code/accordion.html component="links" %}
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="link-docs">
    Dokumentation
  </button>
  <div id="link-docs" class="accordion-content">
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Users should be able to tab to navigate between links.</li>
      <li>Users should be able to activate a link when pressing ‘Enter’ on their keyboard.</li>
      <li>Users should be able to identify links without relying on color alone.</li>
      <li>Users should be able to activate hover and focus states with both a mouse and a keyboard.</li>
    </ul>
  </div>
</div>
