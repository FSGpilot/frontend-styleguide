---
permalink: /components/komponenter/cards/
layout: styleguide
type: component
title: Cards
category: UI components
subcategory: Komponenter 
lead: A card is a sheet of material that serves as an entry point to more detailed information.
---

{% include code/preview.html component="cards" %}
{% include code/accordion.html component="cards" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="alert-docs">
    Documentation
  </button>
  <div id="alert-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Der findes tre typer af cards: lille, mellem og stor. Fælles for dem alle er, at de har en <code>.card</code> class. For at ændre størrelse på et card tilføjes enten:</p> 
    <ul>
      <li><code>.card-small</code></li>
      <li><code>.card-medium</code></li>
      <li><code>.card-large</code></li>
    </ul>
    <p>Eksempelvis: <code>&lt;div class="card card-small"&gt;...&lt;/div&gt;</code>
    <h5>Lille, mellem og stort card</h5>
    <ul>
      <li>Det <em>lille</em> card indeholder en 'header', som har en <code>.card-header</code> class.</li>
      <li>Det <em>mellem</em> card indeholder et 'før content område', som har en <code>.card-content-before</code> class, og en 'header' som har en <code>.card-header</code> class.</li>
      <li>Det <em>store</em> card indeholder en 'header', som har en <code>.card-header</code> class, og et 'content område' som har en <code>.card-content</code> class, og derudover til sidst et 'aktionsområde' som har en <code>.card-action</code> class.</li>
    </ul>
    <h5>Header</h5>
    <p>Headeren indeholder en titel, en understøttende tekst og brødtekst, som alle er p-tags med hver deres class.</p>
    <ul>
      <li><code>.header-titel</code></li>
      <li><code>.subheader</code></li>
      <li><code>.header-content</code></li>
    </ul>
    <h5>Aktionsområde</h5>
    <p>Aktionsområdet kan indeholde brødtekst, knapper, links og funktionelle link, som alle har hver deres div med hver deres class.</p>
    <ul>
      <li><code>.action-content</code></li>
      <li><code>.action-buttons</code></li>
      <li><code>.action-links</code></li>
      <li><code>.action-functionlinks</code></li>
    </ul>
    <h4 class="heading">Accessibility</h4>
    <ul class="content-list">
      <li>Use the ARIA <code>role=<wbr>"alert"</code> to inform assistive technologies of a time-sensitive and important message that is not interactive. If the message is interactive, use the <code>alertdialog</code> role instead.</li>
      <li>Do not visually hide alert messages on the page and then make them visible when they are needed. Users of older assistive technologies may still be able to perceive the alert messages even if they are not currently applicable.</li>
    </ul>
    <h4 class="heading">Usability</h4>
    <h5>When to use</h5>
    <ul class="content-list">
      <li>As a notification that keeps people informed of the status of the system and which may or may not require the user to respond. This includes errors, warnings, and general updates.</li>
      <li>As a validation message that alerts someone that they just did something that needs to be corrected or as confirmation that a task was completed successfully.</li>
    </ul>
    <h5>When to consider something else</h5>
    <ul class="content-list">
      <li>On long forms, always include in-line validation in addition to any error messages that appear at the top of the form. </li>
      <li>If an action will result in destroying a user’s work (for example, deleting an application) use a more intrusive pattern, such as a confirmation modal dialogue, to allow the user to confirm that this is what they want.</li>
    </ul>
    <h5>Guidance</h5>
    <ul class="content-list">
      <li>When the user is required to do something in response to an alert, let them know what they need to do and make that task as easy as possible. Think about how much context to provide with your message. For example, a notification of a system change may require more contextual information than a validation message. Write the message in concise, human readable language; avoid jargon and computer code.</li>
      <li>Be polite in error messages — don’t place blame on the user.</li>
      <li>Users generally won’t read documentation but will read a message that helps them resolve an error; include some educational material in your error message.</li>
      <li>But don’t overdo it — too many notifications will either overwhelm or annoy the user and are likely to be ignored.</li>
      <li>Allow a user to dismiss a notification wherever appropriate.</li>
      <li>Don’t include notifications that aren’t related to the user’s current goal.</li>
    </ul>
  </div>
</div>