---
permalink: /designandcode/badges/
layout: styleguide
type: element
title: Badges
category: UI components
subcategory: Design og kode
lead: Badges draw attention to new or important content.
---

{% include code/preview.html component="badges" %}
{% include code/accordion.html component="badges" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="label-docs">
    Dokumentation
  </button>
  <div id="label-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Alle badges skal have en <code>.badge</code> class på <code>&lt;label&gt;&lt;/label&gt;</code> elementet.</p>
    <p>Badges findes i to størrelser, store og små:</p>
    <ul>
      <li><p>For et stort badge skal der tilføjes en <code>.badge-large</code> class. </p></li>
      <li><p>For et lille badge skal der tilføjes en <code>.badge-small</code> class. </p></li>
    </ul>
    <p>Et stort badge vil se følgende ud:</p>
    <ul>
      <li><code>&lt;label class="badge badge-large"My badge&lt;/label&gt;</code></li>
    </ul>
    <p>Et lille badge vil se følgende ud:</p>
    <ul>
      <li><code>&lt;label class="badge badge-small"My badge&lt;/label&gt;</code></li>
    </ul>
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
