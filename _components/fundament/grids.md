---
permalink: /components/fundament/grids/
layout: styleguide
title: Grids
category: UI components
subcategory: Partikler - Retningslinjer
lead: The Gridsystem builds directly on the well-known Bootstrap-grid system (version 4). This 12-column, responsive grid provides structure for website content.
---
<h3>Containers</h3>
<p>Containers are the most basic layout element in Bootstrap and are required when using our default grid system. Choose from a responsive, fixed-width container (meaning its <code>max-width</code> changes at each breakpoint) or fluid-width (meaning it’s <code>100%</code> wide all the time).</p>

{% include code/preview.html component="grid--container" %}
{% include code/accordion.html component="grid--container" %}

<p>Use <code>.container-fluid</code> for a full width container, spanning the entire width of the viewport.</p>

{% include code/preview.html component="grid--container-fluid" %}
{% include code/accordion.html component="grid--container-fluid" %}

<h3>Rows and Columns</h3>
{% include code/preview.html component="grid" %}
{% include code/accordion.html component="grid" %}

<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="grid-docs">
    Documentation
  </button>
  <div id="grid-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>To use the grid, wrap each grid row in a <code>&lt;div&gt;</code> with the <code>grid</code> class. To use a grid without padding on the right and left, use the <code>grid-full</code> class instead.</p>
    <p>Each grid item is written semantically by its width. For example: <code>width-one-half</code> = 1/2 grid item, <code>width-two-thirds</code> = 2/3 grid item.</p>
    <p>Medium breakpoints are used for 1/6 and 1/12 grid items, which both transform into a 1/3 grid item at medium screen sizes.</p>
    <p>All grid items are full-width at small screen sizes.</p>
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Low-vision users should be able to increase the size of the text by up to 200 percent without breaking the layout.</li>
    </ul>

    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>Almost always use a grid layout — visitors can read more quickly on pages that use grids. Choose a single grid system for your entire site.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>Avoid mixing this grid and other grid systems.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Choose a 12-column grid with flexible column widths and fixed gutters. The width of the padding on the left and right edge of the grid depends on device size.</li>
      <li>Avoid text lines longer than 75 characters. Place text in narrower grid boxes to keep text lines from becoming too wide.</li>
    </ul>
  </div>
</div>
