---
title: Margin og padding
parent: Hjælpefunktioner
order: 03
---

<p>Der er opsat hjælpefunktioner som generere klasser til margin og padding. Disse hjælpefunktioner er inspireret af <a href="https://getbootstrap.com/docs/4.1/utilities/spacing/">Bootstraps Spacing Utilities</a>.</p>
Format: <code>{css-egenskab}{retning}-{størrelse}</code> og <code>{css-egenskab}{retning}-{breakpoint}-{størrelse}</code>.

<h5 class="mb-0">CSS egenskab:</h5>
<ul>
    <li><b>m</b> – for klasser som sætter <code>margin</code></li>
    <li><b>p</b> - for klasser som sætter <code>padding</code></li>
</ul>

<h5 class="mb-0">Retning:</h5>
<ul>
    <li><b>t</b> – for klasser som sætter <code>margin-top</code> eller <code>padding-top</code></li>
    <li><b>b</b> – for klasser som sætter <code>margin-bottom</code> eller <code>padding-bottom</code></li>
    <li><b>l</b> – for klasser som sætter <code>margin-left</code> eller <code>padding-left</code></li>
    <li><b>r</b> – for klasser som sætter <code>margin-right</code> eller <code>padding-right</code></li>
    <li><b>x</b> – for klasser som sætter både<code>*-left</code> og <code>*-right</code></li>
    <li><b>y</b> – for klasser som sætter både<code>*-top</code> og <code>*-bottom</code></li>
    <li><i>blank</i> – for klasser som sætter margin eller padding på alle 4 sider af elementet.</li>
</ul>

<h5 class="mb-0">Størrelse:</h5>
<ul>
    <li><b>0</b> – for klasser som fjerner alt <code>margin</code> eller <code>padding</code></li>
    <li><b>1</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 0.25</code></li>
    <li><b>2</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 0.5</code></li>
    <li><b>3</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer</code></li>
    <li><b>4</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 2</code></li>
    <li><b>5</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 3</code></li>
    <li><b>6</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 4</code></li>
    <li><b>7</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 5</code></li>
    <li><b>8</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 6</code></li>
    <li><b>9</b> – for klasser som sætter <code>margin</code> eller <code>padding</code> til <code>$spacer * 7</code></li>
</ul>
<code>$spacer</code> er sat til <code>8px.</code><br>
Du kan selv tilføje flere muligheder ved at tilføje dem til <code>$spacers</code> variablen.

<h5 class="mb-0">Breakpoint:</h5>
<ul>
    <li><i>blank</i> - for klasser som sætter <code>margin</code> eller <code>padding</code> for alle browserstørrelser.</li>
    <li><b>sm</b> - for klasser som sætter <code>margin</code> eller <code>padding</code> for browserstørrelser over 576px;</li>
    <li><b>md</b> - for klasser som sætter <code>margin</code> eller <code>padding</code> for browserstørrelser over 768px;</li>
    <li><b>lg</b> - for klasser som sætter <code>margin</code> eller <code>padding</code> for browserstørrelser over 992px;</li>
    <li><b>xl</b> - for klasser som sætter <code>margin</code> eller <code>padding</code> for browserstørrelser over 1200px;</li>
</ul>