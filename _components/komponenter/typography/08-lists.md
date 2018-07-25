---
type: component
title: Lists
parent: typography
order: 07
---

<!-- Lists section begin -->

<p class="font-lead">Lists organize written information for users.</p>

{% include code/preview.html component="lists" classes="preview-lists" %}
{% include code/accordion.html component="lists" %}
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="list-docs">
    Dokumentation
  </button>
  <div id="list-docs" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Alle lister har default styling. Dog kan der tilføjes en class på ul afhængig af, om man vil have paragraph tekst eller body tekst. For paragraph tekst tilføjes en <code>paragraph-list</code> class og for body tekst tilføjes en <code>body-list</code> class.</p>
    <p>For lister uden styling bruges en <code>.unstyled-list</code> class eller et mixin <code>@include unstyled-list;</code>.</p>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>Use an ordered list when you need to display text in some ranking, hierarchy, or series of steps.</li>
      <li>Use unordered lists to display text in no specific order.</li>
    </ul>
    <h5>When to consider something different</h5>
    <ul class="content-list">
      <li>If you need to communicate long lists of narrative text.</li>
    </ul>
    <h5>Guidelines</h5>
    <ul class="content-list">
      <li>Use sentence case and begin lists with a capital letter.</li>
      <li>Use punctuation appropriate to the text. Do not leave sentences without periods.</li>
    </ul>
  </div>
</div>
