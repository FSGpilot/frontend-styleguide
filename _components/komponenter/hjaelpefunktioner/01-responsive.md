---
title: Responsive hjælpeklasser
parent: Hjælpefunktioner
order: 01
---

<p>Alle de klasser som bliver genereret af hjælpefunktionerne findes i både i en version som virker i alle browserstørrelser og i responsive versioner som genereres på baggrund af de breakpoints som er defineret i scss-variablen <code>$grid-breakpoints</code>:</p>

<div class="code-highlight">
    <code>
        $grid-breakpoints: ( <br>
        &nbsp;&nbsp;&nbsp;&nbsp;xs: 0,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;sm: 576px,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;md: 768px,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;lg: 992px,<br>
        &nbsp;&nbsp;&nbsp;&nbsp;xl: 1200px<br>
        ) !default;
    </code>
</div>