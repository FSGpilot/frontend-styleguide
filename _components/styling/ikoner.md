---
permalink: /designandcode/ikoner/
layout: styleguide
title: Ikoner
category: UI components
subcategory: Design og kode
lead: Der findes en række standardikoner i designmanualen. Symboler kan underbygge et budskab eller gøre det lettere at afkode en side. Ikoner kan dog sjældent erstatte tekst.
order: 25
---
### Krav

* Ikonerne her i designmanualen skal anvendes i så høj grad som muligt. Skal der anvendes ikoner, som ikke findes i designmanualen, skal nye ikoner have samme look and feel som ikonerne i designmanualen
* Krav til størrelse mv. fremgår af HTML/CSS, som kan downloades ovenfor.

### Anvendelse

Ikonerne nedenfor har bestemte betydninger. Ikonerne kan anvendes på flere måder end eksemplerne viser, men betydningen af dem skal altid være den, som fremgår af manualen.

<p>Se alle ikoner her: <a href="https://materialdesignicons.com">http://https://materialdesignicons.com</a></p>

<p>Nedenfor er vist de ikoner som er inkluderet i styleguiden. Der er to forskellige tilgang til at indsætte ikoner på en side. Via en klasse (baggrundsbillede) eller som inline svg.</p>
<h5>Ikoner indsat via klasser:</h5>
<p>Følgende kode indsætter et 'alert'-ikon: <code>&lt;i class="icon icon-alert-outline"&gt;&lt;/i&gt;</code></p>
{% include code/preview.html component="icons" %}
{% include code/accordion.html component="icons" %}

<h5>Ikoner indsat via inline svg:</h5>
<p>I toppen af <code>&lt;body&gt;</code> er alle svg-ikoner indsat i et område som er skjult. Følgende kode linker til et af disse svg ikoner og indsætter det via dets <code>id</code>: <code>&lt;svg class="icon-svg" &lt;use xlink:href="#alert-outline"&gt;&lt;/use&gt;&lt;/svg&gt;</code></p>

{% include code/preview.html component="icons--svg" %}
{% include code/accordion.html component="icons--svg" %}


