---
permalink: /designandcode/select2-multiselect/
layout: styleguide
type: component
title: Multiselect dropdown
category: UI components
subcategory: Design og kode
lead: The multiselect dropdown uses Select2. Select2 is a jQuery based replacement for select boxes. It supports searching, remote data sets, and pagination (infinite scrolling) of results.
---

{% include code/preview.html component="select2-multiselect" %}
{% include code/accordion.html component="select2-multiselect" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="accordion-bordered-docs">
   Kode dokumentation
  </button>
  <div id="accordion-bordered-docs" aria-hidden="false" class="accordion-content">
    <p>In order to use the multiselect component you have to inklude the <code>dkwds-advanced.js</code> file on your site</p>
    <p>
      You insert the component by making a normal <code>select</code> html element.<br>
      The select-element must have to following attributes in order to enable multiselect:
    </p>
    <ul>
      <li>Must have the class <code>.js-select2</code></li>
      <li>Must have the attribute <code>multiple</code></li>
    </ul>
    <p>The library used to enable multiselection is called <a href="https://select2.org/">Select2</a>.</p>
  </div>
</div>
