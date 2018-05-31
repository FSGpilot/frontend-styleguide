---
permalink: /components/komponenter/labels/
layout: styleguide
type: element
title: Labels
category: UI components
subcategory: Komponenter
lead: Labels draw attention to new or important content.
---

{% include code/preview.html component="labels" %}
{% include code/accordion.html component="labels" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="label-docs">
    Documentation
  </button>
  <div id="label-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Accessibility</h4>
    <p>When labels are used to call out new content that is dynamically loaded onto a page, be sure to use ARIA live regions to alert screen readers of the change.</p>

    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>To draw attention to new, important content on a page that might otherwise be missed.</li>
      <li>To filter results with one or more tags.</li>
      <li>To indicate the number of new or unread items within a container. For example, to indicate the number of unread emails within a person’s inbox.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>When users are likely to confuse a static label with a button. For example, when the label appears in the same area of the page as buttons.</li>
      <li>To call attention to new or updated content, consider changing the background color of the object itself or experiment with changing the font weight.</li>
      <li>When users already expect content to be updated frequently. For example, on a site dedicated to breaking news. In this case placing the new content at the top may be enough.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Users frequently confuse labels as buttons. Always conduct usability testing to make sure your particular implementation is not causing frustration.</li>
      <li>If your labels are not interactive, be sure to disable hover, focus, and active styles.</li>
      <li>Don’t mix interactive and static labels on your site. Once you establish a pattern for how labels behave, users will expect that behavior every time.</li>
      <li>Don’t overdo it — if everything on a page is called out as important, nothing is important.</li>
    </ul>
  </div>
</div>
