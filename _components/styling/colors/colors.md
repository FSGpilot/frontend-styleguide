---
permalink: /designandcode/colors/
redirect_from:
  - /colors/
layout: styleguide
title: Farver
category: UI components
subcategory: Design og kode
lead: Introduktion af farverne
---

<p>Forklaring af farvevalg og sammenhæng til portalerne</p>

<h2>Temahåndtering</h2>
<p>Kort forklaring af baggrunden for temahåndtering</p>

<div class="accordion-bordered mb-6">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="theme">
    Implementering
  </button>
  <div id="theme" class="accordion-content">
    <p class="h6">Temahåndtering</p>
    <p>Tekst om hvordan man temahåndterer.</p>
    <p class="h6">Tilpasningsmuligheder</p>
    <p>Alle farver i styleguiden er opsat med variable. Farverne i styleguiden kan skiftes ved at overskrive eksisterende farve-variable. <br />
    Alle farvevariable har en navngivning der starter med '$color-' og findes i filen '/scss/variables.scss'.<br />
    Farvevariablene kommer i to grupper: 'Swatches and Theming' og 'Component variables'. 'Swatches and Theming' definere alle farverne i farvepaletten. I 'Component variables', overføres disse farver til specifikke komponenter i styleguiden, fx links. <br />
    <br />
    Nedenfor vises et eksempel med to blå farver. Hvis du generelt ønsker at ændre de blå farver gennem hele løsningen skal du overskrive '$color-blue-*' variablene. Hvis du derimod ønsker en anderledes linkfarve som ikke er koblet til de blå farver skal du overskrive de to '$color-link' variable.</p>
    <div class="code-highlight">
    <p style='font-family: Consolas, Monaco, "Andale Mono", monospace; font-size:13px;'>
      //------ Swatches and Theming ----------- <br />
      //--------------------------------------- <br />
      $color-blue-001:              #0059b3 !default;<br />
      $color-blue-002:              #004080 !default;<br />
      <br />
      //------ colors variables ------------ <br />
      //------------------------------------ <br />
      //Links color
      <br />
      $color-link:                  $color-blue-001 !default;<br />
      $color-link-hover:            $color-blue-002 !default;</p>
      </div>
  </div>
</div>



{% include child-sections.html parent='colors' %}
