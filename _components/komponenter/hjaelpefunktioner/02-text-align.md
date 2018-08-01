---
title: Text-align
parent: Hjælpefunktioner
order: 01
---

Der er opsat en hjælpefunktion som automatisk generere klasser til text-align baseret på de definerede breakpoints i $grid-breakpoints.

Format: <code>align-text-{breakpoint}-{retning}</code>

Retning
<ul>
    <li>Left: <code>text-align: left</code></li>
    <li>Center: <code>text-align: center</code></li>
    <li>Right: <code>text-align: right</code></li>
</ul>

Eksempel:
<div class="code-highlight">
    <code>
        &lt;h1 class="align-text-right"&gt; Tekst til højre &lt;/h1&gt;
        &lt;h1 class="align-text-md-left"&gt; Tekst til højre på skærme op til 768px &lt;/h1&gt;
    </code>
</div>

&lt;button&gt;
