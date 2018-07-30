---
title: Text input width
parent: Form controls
order: 02
lead: Text inputs allow people to enter any combination of letters, numbers, or symbols of their choosing (unless otherwise restricted). Text input boxes can span single or multiple lines.
---

{% include code/preview.html component="text-input-width" %}
{% include code/accordion.html component="text-input-width" %}
<div class="accordion-bordered accordion-docs">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="text-input-width-docs">
    Implementering
  </button>
  <div id="text-input-width-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
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
    <ul>
      <li><code>&lt;input type="email" pattern="/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/"&gt;</code></li>
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
    <h4 class="heading">Accessibility</h4>
    <p>If you customize the text inputs, ensure they continue to meet the the <a href="{{ site.baseurl }}/form-controls/"> accessibility requirements that apply to all form controls.</a></p>
    <ul class="content-list">
      <li>Avoid placeholder text for accessibility reasons. Most browsers’ default rendering of placeholder text does not provide a high enough contrast ratio.</li>
      <li>Avoid breaking numbers with distinct sections (such as phone numbers, Social Security Numbers, or credit card numbers) into separate input fields. For example, use one input for phone number, not three (one for area code, one for local code, and one for number). Each field needs to be labeled for a screen reader and the labels for fields broken into segments are often not meaningful.</li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>If you can’t reasonably predict a user’s answer to a prompt and there might be wide variability in users’ answers.</li>
      <li>When using another type of input will make answering more difficult. For example, birthdays and other known dates are easier to type in than they are to select from a calendar picker.</li>
      <li>When users want to be able to paste in a response.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>When users are choosing from a specific set of options.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>The length of the text input provides a hint to users as to how much text to write. Do not require users to write paragraphs of text into a single-line input box; use a text area instead.</li>
      <li>Text inputs are among the easiest type of input for desktop users but are more difficult for mobile users.</li>
      <li>Only show error validation messages or stylings after a user has interacted with a particular field.</li>
      <li>Avoid using placeholder text that appears within a text field before a user starts typing. If placeholder text is no longer visible after a user clicks into the field, users will no longer have that text available when they need to review their entries. (People who have cognitive or visual disabilities have additional problems with placeholder text.)</li>
    </ul>
  </div>
</div>
