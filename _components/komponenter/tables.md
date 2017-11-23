---
permalink: /components/komponenter/tables/
layout: styleguide
type: element
title: Tabeller
category: UI components
subcategory: Komponenter
lead: Tables show tabular data in columns and rows.
---

{% include code/preview.html component="tables" %}
{% include code/accordion.html component="tables" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="table-docs">
    Documentation
  </button>
  <div id="table-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Simple tables can have two levels of headers. Each header cell should have <code>scope=<wbr>"col"</code> or <code>scope=<wbr>"row"</code>.</li>
      <li>Complex tables are tables with more than two levels of headers. Each header should be given a unique <code>id</code> and each data cell should have a <code>headers</code> attribute with each related header cell’s <code>id</code> listed.</li>
      <li>When adding a title to a table, include it in a <code>&lt;caption&gt;</code> tag inside of the <code>&lt;table&gt;</code> element.</li>
    </ul>

    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>When you need tabular information, such as statistical data.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>Depending on the type of content, consider using other presentation formats such as definition lists or hierarchical lists. </li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Tables are great at displaying tabular data. Minimal visual styling helps surface this information more easily.</li>
    </ul>
  </div>
</div>
