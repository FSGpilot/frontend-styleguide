---
type: component
title: Hjørner
parent: borders-shadows
order: 01
---

{% include code/preview.html component="border-radius" %}
{% include code/accordion.html component="border-radius" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="border-radius-docs">
    Implementering
  </button>
  <div id="border-radius-docs" class="accordion-content">
    <h5>Statiske hjørner</h5>
    <ul>
        <li><p>Statiske hjørner er lige og har en <code>border-radius: 0px;</code></p></li>
        <li><p>For at få lige hjørner bruges variablen <code>$static-border-radius</code></p></li>
    </ul>
    <p class="h6 mb-3">Eksempel:</p>
    <div class="code-highlight">
        <code>border-radius: $static-border-radius;</code>
    </div>
    <h5>Interaktive hjørner</h5>
    <ul>
        <li><p>Interaktive hjørner er runde og har en <code>border-radius: 4px;</code></p></li>
        <li><p>For at få runde hjørner bruges variablen <code>$interactive-border-radius</code></p></li>
        <li><p>Interaktive hjørner bør kun bruges til håndtering af interaktive elementer, da det er meningen at differentiere indhold fra aktion.</p></li>
    </ul>
    <p class="h6 mb-3">Eksempel:</p>
    <div class="code-highlight">
        <code>border-radius: $interactive-border-radius;</code>
    </div>
  </div>
</div>

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="alert-docs">
    Dokumentation
  </button>
  <div id="alert-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
