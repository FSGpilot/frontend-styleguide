--- 
permalink: /preview-components/example-b-page1.html
layout: iframed 
title: Example-b-page1.html
---
<header class="header" role="banner">

    <!--1A: Portal header -->
    <div class="portal-header">
        <div class="container portal-header-inner">
            <a href="javascript:void(0);" title="Hjem" aria-label="logo link" class="logo"></a>
            <button class="button button-secondary button-menu-open js-menu-open ml-auto"
                aria-haspopup="menu" title="Åben mobil menu">Menu</button>

            <!-- 1B: Portal header: info + actions-->
            <div class="portal-info">

                <p class="user"><b class="username">Christian Emil Vestergaard Christiansen</b>                    </p>

                <a href="#" class="button button-secondary" role="button">
                    Log ud
                </a>
            </div>
        </div>
    </div>

    <!--2A: Solutiuon header -->
    <div class="solution-header">
        <div class="container solution-header-inner">
            <div class="solution-heading">
                <a href="#" title="Hjem" aria-label="logo link">
                    Familieydelser - børnetilskud
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h6 authority-name"> Styrelse</h6>

                <p>Tlf.: 33 28 38 38</p>

            </div>
        </div>
    </div>

    <nav role="navigation" class=" nav">
        <!-- collapsible-->
        <button class="button button-secondary button-menu-close js-menu-close" title="Luk mobil menu">
            <svg class="icon-svg "><use xlink:href="#close"></use></svg> Luk
        </button>

        <div class="portal-info-mobile">
            <p class="user"><b>Christian Emil Vestergaard Christiansen</b></p>
            <a href="#" class="button button-secondary button-signout">
                Log ud
            </a>
        </div>

        <div class="solution-info-mobile">
            <p><b>Erhvervsministeriet</b></p>
            <p>
                <button class="button-unstyled button-contact" data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
            </p>
        </div>

    </nav>
    <!-- collapsible nav end-->
</header>
<div class="overlay"></div>

<div class="container page-container">
    <header>
        <h1>Familieydelser - børnetilskud</h1>
        <p class="font-lead">Brug en af de følgende funktioner, til at administrere børnetilskud:</p>
    </header>
    <section class="content">
        <h3>
            <a>Beskeder</a>
        </h3>
        <p class="mt-0">Læs beskeder omkring dine aktive sager</p>
        <h3>
            <a>Udbetalinger</a>
        </h3>
        <p class="mt-0">Se tidligere og kommende udbetalinger</p>
        <h3>
            <a>Sager</a>
        </h3>
        <p class="mt-0">Få status på dine nuværende sager</p>
        <h3>
            <a>Ansøgninger</a>
        </h3>
        <p class="mt-0">Se aktive og tidligere ansøgninger</p>
        <h3>
            <a>Ændringer</a>
        </h3>
        <p class="mt-0">Foretag ændringer omkring dit børnetilskud</p>
        <h3>
            <a>Dokumentation</a>
        </h3>
        <p class="mt-0">Opslagsværk for hvordan børnetilskud fungerer</p>
    </section>
</div>

<footer>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 footer-col">
                    <div class="align-left">
                        <ul class="unstyled-list">
                            <li>
                                <span class="h6 weight-semibold" title="Ansvarlig myndighed"
                                    aria-label="Ansvarlig myndighed">Undervisningsministeriet</span>
                            </li>
                            <li>
                                <p>Styrelsen for IT og læring</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 footer-col">
                    <div class="align-right">
                        <ul class="unstyled-list">
                            <li>
                                <a class="function-link" href="mailto:support@stil.dk">support@stil.dk</a>
                            </li>
                            <li>
                                <a class="function-link" href="tel:004533925200">(+45) 33 92 52 00</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>