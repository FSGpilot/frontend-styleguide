---
type: component
title: Skygger
parent: borders-shadows
order: 03
---

{% include code/preview.html component="shadows" %}
{% include code/accordion.html component="shadows" %}
<div class="accordion-bordered">
    <button class="button-unstyled accordion-button"
        aria-expanded="false" aria-controls="shadows-docs">
        Implementering
    </button>
    <div id="shadows-docs" class="accordion-content">
        <h5>Modalvindue</h5>
        <ul>
            <li><p>Modalvinduer har en sort skygge på 0 8px 16px 0 og har variablen <code>$box-shadow-heavy</code></p></li>
        </ul>
        <p class="h6 mb-3">Eksempel:</p>
        <div class="code-highlight">
            <code> box-shadow: $box-shadow-heavy;</code>
        </div>
        <h5>Overflowmenu</h5>
        <ul>
            <li><p>Overflowmenuer har en sort skygge på 0 4px 16px 0 og har variablen <code>$box-shadow-moderately</code></p></li>
        </ul>
        <p class="h6 mb-3">Eksempel:</p>
        <div class="code-highlight">
            <code>box-shadow: $box-shadow-moderately;</code>
        </div>
        <h5>Cards</h5>
        <ul>
            <li><p>Cards har en sort skygge på 0 2px 16px 0 og har variablen <code>$box-shadow-slightly</code></p></li>
        </ul>
        <p class="h6 mb-3">Eksempel:</p>
        <div class="code-highlight">
            <code>box-shadow: $box-shadow-slightly;</code>
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
