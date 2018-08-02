---
title: Display
parent: Hjælpefunktioner
order: 04
---

<p>Der er opsat en hjælpefunktion som automatisk generere klasser til display-egenskaben baseret på de definerede breakpoints i <code>$grid-breakpoints</code>. Disse hjælpeklasser er inspireret af <a href="https://getbootstrap.com/docs/4.1/utilities/display/">Bootstraps Display Utility</a>.</p>
Format: <code>d-{display}</code> og <code>d-{breakpoint}-{display}</code>

<h6 class="mb-0">Display</h6>
<ul>
    <li><code>none</code></li>
    <li><code>inline-block</code></li>
    <li><code>block</code></li>
    <li><code>flex</code></li>
    <li><code>inline-flex</code></li>
</ul>
<h6 class="mb-0">Eksempel</h6>

<table class="table">
  <thead>
    <tr>
      <th>Browserstørrelse</th>
      <th>Klasse</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Skjul på alle</td>
      <td><code>.d-none</code></td>
    </tr>
    <tr>
      <td>Skjul kun på xs</td>
      <td><code>.d-none .d-sm-block</code></td>
    </tr>
    <tr>
      <td>Skjul kun på sm</td>
      <td><code>.d-sm-none .d-md-block</code></td>
    </tr>
    <tr>
      <td>Skjul kun på md</td>
      <td><code>.d-md-none .d-lg-block</code></td>
    </tr>
    <tr>
      <td>Skjul kun på lg</td>
      <td><code>.d-lg-none .d-xl-block</code></td>
    </tr>
    <tr>
      <td>Skjul kun på xl</td>
      <td><code>.d-xl-none</code></td>
    </tr>
    <tr>
      <td>Synlig på alle</td>
      <td><code>.d-block</code></td>
    </tr>
    <tr>
      <td>Synlig kun på xs</td>
      <td><code>.d-block .d-sm-none</code></td>
    </tr>
    <tr>
      <td>Synlig kun på sm</td>
      <td><code>.d-none .d-sm-block .d-md-none</code></td>
    </tr>
    <tr>
      <td>Synlig kun på md</td>
      <td><code>.d-none .d-md-block .d-lg-none</code></td>
    </tr>
    <tr>
      <td>Synlig kun på lg</td>
      <td><code>.d-none .d-lg-block .d-xl-none</code></td>
    </tr>
    <tr>
      <td>Synlig kun på xl</td>
      <td><code>.d-none .d-xl-block</code></td>
    </tr>
  </tbody>
</table>