---
permalink: /components/komponenter/modals/
layout: styleguide
type: component
title: Modals
category: UI components
subcategory: Strukturer (organismer)
lead: Modals lead.
---

{% include code/preview.html component="modal" %}
{% include code/accordion.html component="modal" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="footer-docs">
    Documentation
  </button>
  <div id="footer-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Der er to typer af modalvinduer, herunder: </p>
    <ul class="content-list">
      <li>Passiv modal, som kun indeholder tekst</li>
      <li>Interaktiv modal, der også indeholder interaktion, som knapper og links</li>
    </ul>
    <p>Begge modaltyper har tilhørende classes, der skal tilføjes afhængig af, hvilken modal der skal bruges. </p>
    <h5>Passiv modal</h5>
    <ul>
      <li><code>.js-open-modal-passive</code> som sættes på knappen, der skal åbne modalvinduet</li>
      <li><code>.js-modal-passive</code> som sættes på selve modalvinduet</li>
      <li><code>.js-close-modal-passive</code> som sættes på knappen, der skal lukke modalvinduet</li>
      <li><code>.js-modal-overlay-passive</code> som sættes på modalets overlay</li>
    </ul>
    <h5>Interaktiv modal</h5>
    <ul>
      <li><code>.js-open-modal-interactive</code> som sættes på knappen, der skal åbne modalvinduet</li>
      <li><code>.js-modal-interactive</code> som sættes på selve modalvinduet</li>
      <li><code>.js-close-modal-interactive</code> som sættes på knappen, der skal lukke modalvinduet</li>
      <li><code>.js-modal-overlay-interactive</code> som sættes på modalets overlay</li>
    </ul>
    <p>I Interaktive modaler skal knapper og links tilføjes i en div, der har en <code>.modalbuttons</code> class.</p>
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Code the navigation so that pressing the tab key moves focus from link to link in the navigation, even when the navigation has collapsed into an accordion.</li>
      <li>On small screens: when collapsed into an accordion, the navigation should also meet the accessibility requirements outlined in the "Accordion" section.</li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>Use the big footer when you want to replicate your site’s navigation scheme in the footer and offer newsletter signups.</li>
      <li>Use the medium footer when you want to offer only a few footer links (for disclaimers, terms of service, etc.), social media icons, and contact information.</li>
      <li>Use the slim footer when you only want to offer a few footer links and nothing else.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>Avoid using the medium and slim footers when your footer has more than five links.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>Footer links should point to popular content that might answer a visitor’s remaining questions. Links to disclaimers and legal content sometimes need to be in the footer, but try to minimize “disclaimer bloat” wherever possible.</li>
      <li>Link grouping in the footer does not have to mirror link grouping in top level header navigation (especially if the navigation offers many more links than the footer can).</li>
      <li>Include the newsletter sign up if one of your website’s goals is getting visitors to sign up for a newsletter.</li>
      <li>Link only to social media your agency updates frequently or uses to communicate with customers.</li>
      <li>Important contact information should be limited to general email or phone numbers, which should be clickable links to dial from a mobile phone. Physical addresses should live on contact pages users can navigate to from the accordion links.</li>
    </ul>
  </div>
</div>
