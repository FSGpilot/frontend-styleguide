---
permalink: /designandcode/accordions/
layout: styleguide
type: component
title: Accordions
category: UI components
subcategory: Komponenter
lead: Accordions are a list of headers that can be clicked to hide or reveal additional content.
---

{% include code/preview.html component="accordion" %}
{% include code/accordion.html component="accordion" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
    aria-expanded="true" aria-controls="documentation">
    Documentation
  </button>
  <div id="documentation" class="accordion-content">
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>
        Code header areas in the accordion as <code>&lt;buttons&gt;</code> so that they are usable with both screen readers and the keyboard.
      </li>
      <li>
        Buttons should state if they are expanded with <code>aria-expanded=<wbr>"true"</code>. The <code>aria-expanded=<wbr>"false"</code> attributes will be added to other buttons when the accordion is initialized by the JavaScript.
      </li>
      <li>
        Each button has a unique name <code>aria-controls=<wbr>"id"</code> that associates the control to the appropriate region by referencing the controlled element&rsquo;s <code>id</code>.
      </li>
      <li>
        Each content area will have its <code>aria-hidden</code> attribute set to either <code>true</code> or <code>false</code> by the component, depending on its corresponding button&rsquo;s <code>aria-expanded</code> attribute. To ensure that your content is accessible in the event that the JavaScript does not load or is disabled, you should not set <code>aria-hidden=<wbr>"true"</code> on any of your content areas.
      </li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>Users only need a few specific pieces of content within a page.</li>
      <li>Information needs to be displayed in a small space.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>If visitors need to see most or all of the information on a page. Use well-formatted text instead.</li>
      <li>If there is not enough content to warrant condensing. Accordions increase cognitive load and interaction cost, as users have to make decisions about what headers to click on.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Allow users to click anywhere in the header area to expand or collapse the content; a larger target is easier to manipulate.</li>
      <li>Make sure interactive elements within the collapsible region are far enough from the headers that users don’t accidentally trigger a collapse. (The exact distance depends on the device.)</li>
    </ul>
    <a name="deprecated"></a>
    <h4 class="heading">Upgrading deprecated accordions</h4>
    <p>The accordion was changed July 2016 in order to improve its
    implementation. Currently, both versions of the accordion work, but at some
    point in the future, the deprecated accordion will no longer function correctly.
    To upgrade your existing accordions to the new accordion:</p>
    <ul class="content-list">
      <li>Remove the top level div that contains the <code>accordion</code> or
      <code>accordion-bordered</code> class.</li>
      <li>Add the <code>accordion</code> or <code>accordion-bordered</code>
      class to the <code>ul</code> element that's now at the top level.</li>
    </ul>
  </div>
</div>