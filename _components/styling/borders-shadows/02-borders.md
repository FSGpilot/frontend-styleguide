---
type: component
title: Streger
parent: borders-shadows
order: 02
---

{% include code/preview.html component="borders" %}
{% include code/accordion.html component="borders" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="borders-docs">
    Implementering
  </button>
  <div id="borders-docs" class="accordion-content">
    <h4>Ydre borders</h4>
    <ul>
        <li><p>Ydre borders er 1px bredde og er mørkegrå. For at bruge ydre borders bruges variablen <code>$outer-border</code></p></li>
        <li><p>Bruges som ydre borders på komponenter, til at adskille dem fra hinanden.</p></li>
    </ul>
    <p class="h5 mb-3">Eksempel:</p>
    <div class="code-highlight">
        <code>border: $outer-border;</code>
    </div>
    <h4>Indre borders</h4>
    <ul>
        <li><p>Indre borders er 1px bredde og er lysegrå. For at bruge indre borders bruges variablen <code>$inner-border</code></p></li>
        <li><p>Anvendes som indvendige border i komponenter, der kræver separering af elementer.</p></li>
    </ul>
    <p class="h5 mb-3">Eksempel:</p>
    <div class="code-highlight">
        <code>border: $inner-border;</code>
    </div>
    <h4>Knap borders</h4>
    <ul>
        <li><p>Borders på knapper er 2px bredde og farven afhænger af elementet. For at bruge borders til knapper bruges variablen <code>$button-border</code></p></li>
        <li><p>Har ekstra border bredde, som bruges på knapper</p></li>
    </ul>
    <p class="h5 mb-3">Eksempel:</p>
    <div class="code-highlight">
        <code>border: $button-border;</code>
    </div>
  </div>
</div>

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="alert-docs">
    Brugervenlighed
  </button>
  <div id="alert-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
