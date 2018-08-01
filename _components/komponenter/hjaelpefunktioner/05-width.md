---
title: Bredde i procent
parent: Hjælpefunktioner
order: 05
---

<p>Der er opsat en hjælpefunktion som automatisk generere klasser som styrer bredde i procent. De responsive klasser er baseret på de definerede breakpoints i <code>$grid-breakpoints</code>.</p>
Format: <code>w-percent-{bredde}</code> og <code>w-percent-{breakpoint}-{bredde}</code>

<h6 class="mb-0">Bredde</h6>
<ul>
    <li>10: <code>10%</code></li>
    <li>20: <code>20%</code></li>
    <li>30: <code>30%</code></li>
    <li>40: <code>40%</code></li>
    <li>50: <code>50%</code></li>
    <li>60: <code>60%</code></li>
    <li>70: <code>70%</code></li>
    <li>80: <code>80%</code></li>
    <li>90: <code>90%</code></li>
    <li>100: <code>100%</code></li>
</ul>

<h6>Eksempel:</h6>
<div class="code-highlight">
    <code>
        &lt;h1 class="w-percent-100"&gt; Dette element har en bredde på 100% &lt;/h1&gt; <br>
        &lt;h1 class="w-percent-md-30"&gt; Dette element har en bredde på 30% på skærme op til 768px &lt;/h1&gt;
    </code>
</div>


