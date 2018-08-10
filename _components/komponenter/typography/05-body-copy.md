---
type: component
title: Brødtekst (body copy)
parent: typography
order: 05
---

<p>The Frontend styleguide's global default <code>font-size</code> is <strong>16px</strong>, with a <code>line-height</code> of <strong>24px</strong>. This is applied to the <code>&lt;body&gt;</code> and all paragraphs. In addition, <code>&lt;p&gt;</code> (paragraphs) receive a bottom margin of half their computed line-height (10px by default).</p>

{% include code/preview.html component="inlinetext" %}
{% include code/accordion.html component="inlinetext" %}

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="bodycopy-docs-tech">
    Implementering
  </button>
  <div id="bodycopy-docs-tech" aria-hidden="true" class="accordion-content">
    <p>Fontstørrelsen for brødtekst er som udgangspunkt <strong>16px</strong>, og har en liniehøjde som svarer til 24px.</p>
    <p>Alle fontstørrelser er angiver i rem-værdier og forholder sig derfor til fontstørrelsen som er angivet <code>&lt;html&gt;</code>-tagget.</p>
    <p>HTML-taggets fontstørrelse er angivet i procent således at fontstørrelen er relativ til broswerens brugervalgte fontstørrelse. De fleste brugere har en standardinstilling på 16px, 62.5% af dette er 10px og en font-størrelse på 1.6rem giver derfor en fontstørrelse på 16px. Hvis brugeren vælger at indstille en standard fontstørrelse som er større end 16px vil hele sitet afspejle brugerens ønske.</p>
    <div class="code-highlight">
        <code>        
            html { font-size: 62.5%; } <br>
            p &nbsp;&nbsp;&nbsp;{ font-size: 1.6rem; } /* =16px */ <br>
        </code>
    </div>
  </div>
</div>
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="bodycopy-docs">
    Brugervenlighed
  </button>
  <div id="bodycopy-docs" class="accordion-content">
    
  </div>
</div>
