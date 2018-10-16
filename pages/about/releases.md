---
permalink: /about/releases/
layout: styleguide
title: Versionsnoter
category: About
subnav:
- text: Version 2.1.2
  href: '#version-212'
---
<p class="font-lead">Nedenfor vises release notes — en opsummering af bug fixes, nye features og andre opdateringer.</p>
<p>Her du et nyt forslag til en feature eller et bug fix? <a href="https://github.com/FSGpilot/frontend-styleguide-components/issues">Så må du meget gerne oprette et issue på github</a></p>

<div id="version-212" class="mt-8">
  <h3 class="mb-0">Version 2.1.2</h3>
  <p class="small-text mt-0">16-10-2018</p>
  <ul>
    <li>
      <b>Nye skriftstørrelser til H1-H6</b>
      <ul>
        <li>H1 går fra 36px til 40px.</li>
        <li>H2 går fra 27px til 30px.</li>
        <li>H3 er stadig 24px.</li>
        <li>H4 går fra 22px til 19px;</li>
        <li>H5 går fra 20px til 16px;</li>
        <li>H6 går fra 16px til 13px;</li>
        <li>Display-1 går fra 120px til 80px</li>
        <li>Display-2 går fra 60px til 32px;</li>
      </ul>
      <p>Hvis du ønsker at beholde det samme visualle udtryk skal man gå fra h5 til h4.</p>
    </li>
    <li class="mt-4">
      <b>Ny max-width styling</b>
      <p class="m-0">Klassen '.content' er fjernet. Max-width stylingen er nu kodet direkte til p, font-lead etc.</p>
    </li>
    <li class="mt-4">
      <b>Sidenavigation i bunden af eksempelsiderne:</b>
      <p class="m-0">"Breadcrumb" er omdøbt til "page-navigation". 	Html'en er nu således ud:</p>
      <div class="code-highlight">
        <code>
          &lt;nav class="page-navigation"&gt; <br>
          &nbsp;&nbsp; &lt;a href="#" class="button button-primary"&gt;Næste&lt;/a&gt;<br>
          &nbsp;&nbsp; &lt;a href="#" class="button button-ghost"&gt;Tilbage&lt;/a&gt;<br>
          &lt;/nav&gt;
        </code>
      </div>
    </li>
  </ul>
</div>