---
title: Input bredde og validering
parent: Form controls
order: 02
lead: 
---

{% include code/preview.html component="text-input-width" %}
{% include code/accordion.html component="text-input-width" %}
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="false" aria-controls="text-input-width">
    Implementering
  </button>
  <div id="text-input-width" aria-hidden="true" class="accordion-content">
    <h5>Input bredde med rem</h5>   
    <p>Inputfelter har en standard bredde på 32rem, for at ændre bredden på inputfelter bruges nedenstående klasser:</p>
    <ul>
      <li><code>.input-width-xxs</code> har en bredde på 8rem</li>
      <li><code>.input-width-xs</code> har en bredde på 16rem</li>
      <li><code>.input-width-s</code> har en bredde på 24rem</li>
      <li><code>.input-width-m</code> har en bredde på 32rem</li>
      <li><code>.input-width-l</code> har en bredde på 40rem</li>
      <li><code>.input-width-xl</code> har en bredde på 48rem</li>
    </ul>
    <h5>Input bredde med tegn</h5>
    <p>For at styre bredden på inputfelter efter tegn, skal der i stedet bruges nedenstående klasser:</p>
    <ul>
      <li><code>.input-char-4</code> har en bredde der passer til 4 tegn</li>
      <li><code>.input-char-8</code> har en bredde der passer til 8 tegn</li>
      <li><code>.input-char-11</code> har en bredde der passer til 11 tegn</li>
      <li><code>.input-char-27</code> har en bredde der passer til 27 tegn</li>
      <p>For at tilføje flere input bredder, der er styret af tegn, skal der tilføjes en ny klasse, hvor det nye tal skal erstattes med X.</p>
      <ul>
        <li><code>.input-char-X { max-width: calc(2px + 16px + 16px + Xch); }</code></li>
      </ul>
    </ul>
    <h5>Validering</h5>
    <p>Vi anbefaler at der laves validering på inputfelter. Nedenfor ses et eksempel på validering af en e-mail, samt validering af et felt der kun må indeholde tal.</p>
    <p class="h6">Felt med email validering</p>
    <ul>
      <li><code>&lt;input type="email" pattern="/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/"&gt;</code></li>
    </ul>
    <p class="h6">Felt med kun tal validering</p>
    <ul>
      <li><code>&lt;input type="number" pattern="[0-9]"&gt;</code></li>
    </ul>
  </div>
</div>

<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="text-input-width-docs">
    Dokumentation
  </button>
  <div id="text-input-width-docs" aria-hidden="false" class="accordion-content">
    
  </div>
</div>
