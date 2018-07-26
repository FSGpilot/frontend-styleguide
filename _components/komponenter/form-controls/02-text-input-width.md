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
    Dokumentation
  </button>
  <div id="text-input-width-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Inputfelter har en standard bredde på 40rem, for at ændre bredden på inputfelter bruges nedenstående class:</p>
    <ul>
      <li><code>.input-width-55</code> er 5.5rem bred</li>
      <li><code>.input-width-100</code> er 10rem bred</li>
      <li><code>.input-width-150</code> er 15rem bred</li>
      <li><code>.input-width-200</code> er 20rem bred</li>
      <li><code>.input-width-300</code> er 30rem bred</li>
      <li><code>.input-width-400</code> er 40rem bred</li>
      <li><code>.input-width-500</code> er 50rem bred</li>
    </ul>
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
