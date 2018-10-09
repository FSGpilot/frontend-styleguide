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
<p>Styleguiden er udviklet med 3 forskellige temaer. Standard temaet er det neutrale tema hvor primærfarven er grå. De to andre teamer er målrettet borger.dk og virk.dk.</p>

<div class="accordion-bordered mb-6">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="theme">
    Implementering
  </button>
  <div id="theme" class="accordion-content">
    <p class="h5">Temahåndtering</p>
    <p>Styleguiden er udviklet med 3 forskellige temaer. Standard temaet er det neutrale tema hvor primærfarven er grå (#454545). De to andre temaer er målrettet borger.dk og virk.dk. Styling filerne til de to temaer kan findes i mappen <code>/src/stylesheets/themes</code>.</p>
    <p>Temaerne er simple, det eneste som er forskelligt mellem standard temaet og de to andre temaer er primærfarven og nolge få variationer i headeren (fx logo). Alt andet er ens på tværs af temaer.</p>
    <p class="mb-2">Tema eksempel – borger.dk:</p>
    <div class="code-highlight">
      <code>
        $color-primary: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#568331; //grøn<br />
        $color-primary-medium: #3C5C22; //mørkere grøn<br />
        $color-primary-dark:&nbsp;&nbsp;&nbsp; #233614; //mørkegrøn<br /><br />
        .portal-header{<br />
        &nbsp;&nbsp;  background-color: #f1f1f1;	<br />
        }<br />
        .logo{<br />
        &nbsp;&nbsp; background-image: url('logo-borgerdk.svg');<br />
        &nbsp;&nbsp;  width: 144px;<br />
        &nbsp;&nbsp;  height: 36px;<br />
        }
      </code>
    </div>
    <p class="h5">Tilpasningsmuligheder</p>
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
