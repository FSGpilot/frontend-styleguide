---
permalink: /
layout: landing
title: Frontend Styleguiden
---

<div class="row">
  <div class="col-12 styleguide-content content">
    <header>
      <h1>Designsystemet er åbent</h1>
    </header>

    <p class="font-lead">
      Designsystemet er Open Source. Det betyder først og fremmest at du frit kan benytte systemet og den bagvedliggende kode - men også at du kan bidrage til at det udvikles og forbedres. På den måde kan netop dine indsigter få lov at gavne os alle.
    </p>

    <p class="font-lead">
      <a href="{{ site.baseurl }}/components/">Se designsystemet</a>
    </p>
  </div>
  <div class="md-col-4">
    <div class="card card-medium">
        <div class="card-header">
            <h3>Kom godt i gang</h3>
            <p>Få inspiration og hjælp</p>
        </div>
        <div class="card-block card-content card-center">
          <div>
            <i class="mdi mdi-thumb-up-outline mdi-48px"></i>
          </div>
        </div>
        <div class="card-action">
            <a href="{{ site.baseurl }}/getting-started/">Kom godt i gang</a>
        </div>
    </div>
  </div>
  <div class="md-col-4">
    <div class="card card-medium">
        <div class="card-header">
            <h3>Opdateringer</h3>
            <p>Følg med i hvad der er på trapperne</p>
        </div>
        <div class="card-block card-content card-center">
            <i class="mdi mdi-autorenew mdi-48px"></i>
        </div>
        <div class="card-action">
            <a href="{{ site.baseurl }}/whats-new/product-roadmap/">Opdateringer</a>
        </div>
    </div>
  </div>
  <div class="md-col-4">
    <div class="card card-medium">
        <div class="card-header">
            <h3>Bidrag til designsystemet</h3>
            <p>Giv input og byg tingene der mangler</p>
        </div>
        <div class="card-block card-content card-center">
            <i class="mdi mdi-source-branch mdi-48px"></i>
        </div>
        <div class="card-action">
            <a href="{{ site.baseurl }}/getting-started/bidrag-til-designsystemet/">Bidrag til designsystemet</a>
        </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-12">
    <h2>Browser Compatibility</h2>
    <!--<div class="alert alert-warning">
      <div class="alert-body">
        <h3 class="alert-heading">Warning</h3>
        <div class="alert-text">-->
          <p>Due to the use of <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background">flexbox</a>, we do not support IE<11. There are too many bugs and workarounds to be solved, and as IE10 is only partially supporting flexbox, we use <em>vendor prefixes</em> to make flexbox work in IE11, and only support modern browsers.</p>
          <p>If the content looks off to you, we encourage you to simply upgrade your browser, or try a more modern one.</p>
        <!--</div>
      </div>
    </div>-->
  </div>
  <div class="row mt-3">
    <div class="col-12">
      <ul class="transparent-list">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-internet-explorer"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">IE9 / IE10</div>
                  <div class="list-tile-subtitle">Not supported</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-close text-error"></i>
                </div>
              </ul>
            </li>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-internet-explorer"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">IE11</div>
                  <div class="list-tile-subtitle">Supported by prefixes</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-check text-success"></i>
                </div>
              </ul>
            </li>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-edge"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">Edge</div>
                  <div class="list-tile-subtitle">Supported</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-check text-success"></i>
                </div>
              </ul>
            </li>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-google-chrome"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">Chrome</div>
                  <div class="list-tile-subtitle">Supported</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-check text-success"></i>
                </div>
              </ul>
            </li>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-firefox"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">Firefox</div>
                  <div class="list-tile-subtitle">Supported</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-check text-success"></i>
                </div>
              </ul>
            </li>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <li>
              <ul class="list-tile">
                <div class="list-tile-icon">
                  <i class="mdi mdi-apple-safari"></i>
                </div>
                <div class="list-tile-content">
                  <div class="list-tile-title">Safari 9+</div>
                  <div class="list-tile-subtitle">Supported</div>
                </div>
                <div class="list-tile-action">
                  <i class="mdi mdi-check text-success"></i>
                </div>
              </ul>
            </li>
          </div>
        </div>
      </ul>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-6 content">
    <h2 class="mt-2">Bidrag til Frontend Styleguiden som ikke-koder</h2>
    <p>Har du en tanke eller en ændring du har lyst til bidrage med til Frontend Styleguiden, men har aldrig skrevet en linjes kode i dit liv? Så kan du her nemt komme igang med at bidrage til Frontend Styleguidens mange tekstsider. Det er nemlig sådan at alle tekstsiderne på Frontend Styleguiden er skrevet med noget der hedder "Markdown". At skrive Markdown er næsten ligesom at skrive et almindeligt word dokument, og når man er færdig med sit bidrag og tilføjer det til Frontend Styleguidens hjemmeside, bliver det automatisk lavet om til en præsentabel side.</p>
    <p>For at sætte din computer op til at kunne skrive bidrag til Frontend Styleguiden, skal du blot følge nedenstående link:</p>
    <p><a href="{{ site.baseurl }}/getting-started/bidrag-til-designsystemet/#bidrag-til-Styleguiden-uden-kendskab-til-kode">Opsætning af computer for bidragelse</a></p>
  </div>
  <div class="col-lg-6 content">
    <h2 class="mt-2">Få hjælp og inspiration</h2>
    <p>Er du i tvivl om hvordan du kommer i gang med at bruge Frontend Styleguiden eller vil blot vide hvad den kan bruges til, er der massere af hjælp at hente. Under <a href="{{site.baseurl}}/components/">designsystem</a> kan du finde alt fra gode designretningslinjer til en beskrivelse af alle byggestenene som kan bruges til at bygge en ny selvbetjeningsløsning. Mangler du inspiration til din løsning, kan du under <a href="{{site.baseurl}}/page-templates/eksemplariske-eksempler/">eksempler</a> finde forskellige typer af eksemplariske eksempler. I Frontend Styleguiden er der så vidt muligt medfølgende eksempelkode til både dele af og hele selvbetjeningsløsninger.</p>
    <p>Har du stadig spørgsmål eller undren til Frontend Styleguiden, eller har du blot et ønske til en komponent som mangler, så skriv til os ved at klikke på nedenstående link:</p>
    <p><a href="https://github.com/jonasjensen77/frontend-styleguide-poc/issues">Skriv til os via GitHub</a></p>
  </div>
</div>
