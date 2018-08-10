---
title: Dato input
parent: Form controls
order: 07
lead: Tre seperate felter er den nemmeste måde for brugeren at indskrive dato.
---

{% include code/preview.html component="date-input" %}
{% include code/accordion.html component="date-input" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="date-input-tech">
    Implementering
  </button>
  <div id="date-input-tech" aria-hidden="false" class="accordion-content">
     <ul>
      <li>Dato-komponenten består af 2 dele: 3 input-felter og en datepicker.</li>
      <li>Datepickeren er implementeret med vendor scriptet <a href="https://github.com/dbushell/Pikaday">Pikaday</a>. Dette script og den javascript-kode som initialisere dato-komponenten er inkluderet i core javascript filen (dkwds.js).</li>
      <li>Inputfelterne bruger 'regex-input-mask' scriptet som forhindre brugeren i at indskrive mere end 2 tal for dag og måned, og 4 tal i år-inputtet. Derudover forhindre 'regex-input-mask' at brugeren indskriver tegn som ikke er tal. Eksempel for day og måned: <code> data-input-regex="^[0-9]{0,2}$"</code></li>
      <li>
        For at initialisere dato-komponenten skal <code>.date-group</code>-elementet have klassen <code>.js-calendar-group</code>. Derudover skal de tre inputfelter have følgende klasser:
        <ul>
          <li>Dag input: <code>.js-calendar-day-input</code></li>
          <li>Måned input: <code>.js-calendar-month-input</code></li>
          <li>År input: <code>.js-calendar-year-input</code></li>
        </ul>
      </li>
    </ul>
  </div>
</div>
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="date-input-docs">
    Brugervenlighed
  </button>
  <div id="date-input-docs" aria-hidden="false" class="accordion-content">

  </div>
</div>
