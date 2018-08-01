---
title: Text-align
parent: Hjælpefunktioner
order: 02
---

<p>Der er opsat en hjælpefunktion som automatisk generere klasser til text-align baseret på de definerede breakpoints i $grid-breakpoints.</p>

Format: <code>align-text-{retning}</code> og <code>align-text-{breakpoint}-{retning}</code>

<h6 class="mb-0">Retning:</h6>
<ul>
    <li>Left:&nbsp;&nbsp;&nbsp;<code>text-align: left</code></li>
    <li>Center:&nbsp;<code>text-align: center</code></li>
    <li>Right:&nbsp;&nbsp;<code>text-align: right</code></li>
</ul>

<h6 class="mb-0">Eksempel:</h6>
<div class="code-highlight">
    <code>
        &lt;h1 class="align-text-right"&gt; Tekst til højre &lt;/h1&gt; <br>
        &lt;h1 class="align-text-md-left"&gt; Tekst til højre på skærme op til 768px &lt;/h1&gt;
    </code>
</div>
