---
permalink: /designandcode/tags/
layout: styleguide
type: element
title: Tags
category: UI components
subcategory: Design og kode
lead: Tags
---

{% include code/preview.html component="tags" %}
{% include code/accordion.html component="tags" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="false" aria-controls="tags-code-documentation">
    Kode dokumentation
  </button>
  <div id="tags-code-documentation" class="accordion-content">
    <p>Der er to eksempler på hvordan tags kan se ud. Ét uden ikon og ét med ikon.</p>
    <p>Alle tags skal have en <code>.tag</code> class og en <code>.tag-primary</code> class på <code>&lt;button&gt;&lt;/button&gt;</code> elementet.</p>
    <p>Hvis et tag skal have ikon, skal der yderligere tilføjes en <code>.tag-icon</code> class.</p>
    <p></p>
    <p>Et primært tag vil se følgende ud:</p>
    <ul>
      <li><code>&lt;button class="tag tag-primary"My tag&lt;/button&gt;</code></li>
    </ul>
    <p>Et primært tag med ikon vil se følgende ud:</p>
    <ul>
      <li><code>&lt;button class="tag tag-icon tag-primary"My tag&lt;/button&gt;</code></li>
    </ul>
  </div>
</div>
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="accordion-bordered-docs">
    Dokumentation
  </button>
  <div id="accordion-bordered-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Buttons should display a visible focus state when users tab to them.</li>
      <li>Avoid using <code>&lt;div&gt;</code> or <code>&lt;img&gt;</code> tags to create buttons. Screen readers don't automatically know either is a usable button.</li>
      <li>When styling links to look like buttons, remember that screen readers handle links slightly differently than they do buttons. Pressing the Space key triggers a button, but pressing the Enter key triggers a link.</li>
      <li>Disabled buttons have a tabindex="-1" and aria-disabled="true" attribute on these links (to prevent them from receiving keyboard focus) and use custom JavaScript to disable their functionality.</li>
      <li>Links that appear as buttons must have role="button".</li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>Use buttons for the most important actions you want users to take on your site, such as "download," "sign up," or "log out."</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>If you want to lead users between pages of a website. Use links instead.</li>
      <li>Less popular or less important actions may be visually styled as links.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Generally, use primary buttons for actions that go to the next step and use secondary buttons for actions that happen on the current page.</li>
      <li>Style the button most users should click in a way that distinguishes from other buttons on the page. Try using the  “large button” or the most visually distinct fill color.</li>
      <li>Make sure buttons should look clickable—use color variations to distinguish static, hover and active states.</li>
      <li>Avoid using too many buttons on a page.</li>
      <li>Use sentence case for button labels. </li>
      <li>Button labels should be as short as possible with “trigger words” that your users will recognize to clearly explain what will happen when the button is clicked (for example, “download,” “view” or “sign up”).</li>
      <li>Make the first word of the button’s label a verb. For example, instead of “Complaint Filing” label the button “File a complaint.”</li>
      <li>At times, consider adding an icon to signal specific actions (“download”, “open in a new window”, etc). </li>
    </ul>
  </div>
</div>
