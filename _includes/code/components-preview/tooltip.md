--- 
permalink: /preview-components/tooltip.html
layout: iframed 
title: Tooltip.html
---
<div class="container">
    <p class="h6">Tooltip (kommer frem ved mouse-over):</p>
    <button class="button button-primary js-tooltip" role="tooltip" title="Dette er et tooltip"
        aria-label="Dette er et tooltip">Knap med tooltip</button>
    <p class="h6">Popover (kræver tryk)</p>
    <a class="popover js-tooltip" data-tippy-trigger="click" role="tooltip" title="Dette er en hjælpetekst i en popover"
        aria-label="Dette er en hjælpetekst i en popover">
        <svg class="icon-svg "><use xlink:href="#help-circle-outline"></use></svg>
    </a>

    <p class="h6">Eksempel på konfiguration - placering:</p>
    <button class="button button-primary js-tooltip" data-tippy-placement="top"
        title="Top tooltip">Top</button>
    <button class="button button-primary js-tooltip" data-tippy-placement="bottom"
        title="Bund tooltip">Bund</button>
    <button class="button button-primary js-tooltip" data-tippy-placement="left"
        title="Venstre tooltip">Venstre</button>
    <button class="button button-primary js-tooltip" data-tippy-placement="right"
        title="Højre tooltip">Højre</button>
</div>