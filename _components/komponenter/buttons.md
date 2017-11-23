---
permalink: /components/komponenter/buttons/
layout: styleguide
type: element
title: Knapper
category: UI components
subcategory: Komponenter
lead: Use buttons to signal actions.
---

{% include code/preview.html component="buttons" %}
{% include code/accordion.html component="buttons" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="accordion-bordered-docs">
    Documentation
  </button>
  <div id="accordion-bordered-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>The examples demonstrate how to use button elements. To use a button style on an anchor link, add the <code>button</code> class to your anchor link.</p>
    <p>To use a different style button on your anchor link, add the special button class in addition to <code>button</code>:</p>
    <ul>
      <li><code>button-primary-alt</code></li>
      <li><code>button-secondary</code></li>
      <li><code>button-gray</code></li>
      <li><code>button-outline</code></li>
      <li><code>button-outline-inverse</code></li>
      <li><code>button-disabled</code></li>
      <li><code>button-big</code></li>
    </ul>
    <p>For example, a secondary button style would use the following code:
    <code>&lt;a class="button button-secondary" href=&quot;/my-link"&gt;My button&lt;/a&gt;</code></p>
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Buttons should display a visible focus state when users tab to them.</li>
      <li>Avoid using <code>&lt;div&gt;</code> or <code>&lt;img&gt;</code> tags to create buttons. Screen readers don't automatically know either is a usable button.</li>
      <li>When styling links to look like buttons, remember that screen readers handle links slightly differently than they do buttons. Pressing the Space key triggers a button, but pressing the Enter key triggers a link.</li>
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
