---
title: Date input
parent: Form controls
maturity: alpha
order: 06
lead: Three text fields are the easiest way for users to enter most dates.
---

{% include code/preview.html component="date-input" %}
{% include code/accordion.html component="date-input" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="date-input-docs">
    Documentation
  </button>
  <div id="date-input-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p></p>
    <ul>
      <li>The date input component consist of 2 parts, 3 inputs and a datepicker.</li>
      <li>The datepicker is implemented with the vendor script <a href="https://github.com/dbushell/Pikaday">Pikaday</a>. This script and the javascript code used to initialize the datepicker component is included in the core javascript file (dkwds.js).</li>
      <li>The input fields uses the 'regex-input-mask' script to prevent the user from inputting more than 2 numbers for the day and month input and 4 numbers for the year input. Additionally the 'regex-input-mask' prevents the user from inputting non-numeric characters. Example from the day and month input: <code> data-input-regex="^[0-9]{0,2}$"</code></li>
      <li>
        In order to initialize the javascript the date-group must have the class <code>.js-calendar-group</code>. Furthormore the three inputs must have the following classes:
        <ul>
          <li>Day input: <code>.js-calendar-day-input</code></li>
          <li>Month input: <code>.js-calendar-month-input</code></li>
          <li>Year input: <code>.js-calendar-year-input</code></li>
        </ul>
      </li>
    </ul>

    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>These text fields should follow the <a href="{{ site.baseurl }}/form-controls/#text-inputs"> accessibility guidelines for all text inputs.</a></li>
      <li>Do not use JavaScript to auto advance the focus from one field to the next. This makes it difficult for keyboard-only users to navigate and correct mistakes.</li>
    </ul>

    <h4 class="heading">Usability</h4>
    <ul class="content-list">
      <li>Be sure each field is properly labeled — some countries enter dates in month, day, year order.</li>
      <li>It may be tempting to switch all or some of these text fields to drop downs, but these tend to be more difficult to use than text boxes.</li>
    </ul>
  </div>
</div>
