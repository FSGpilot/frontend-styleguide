--- 
permalink: /preview-components/example-boernetilskud-ansoegning-2.html
layout: iframed 
title: Example-boernetilskud-ansoegning-2.html
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
            <div class="solution-heading content">
                <a href="#" title="Hjem" aria-label="logo link">
                    Familieydelser - børnetilskud
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h6 authority-name"> Styrelsen for Eksempler</h6>

                <p>Tlf.: 33 28 38 38</p>

            </div>
        </div>
    </div>

    <div class="overlay"></div>
    <nav role="navigation" class=" nav">
        <!-- collapsible-->
        <button class="button button-tertiary button-menu-close js-menu-close" title="Luk mobil menu">
            <svg class="icon-svg "><use xlink:href="#close"></use></svg> Luk
        </button>

        <!-- 3: Main navigation-->
        <div class="navbar navbar-primary">
            <!--3A: Main navigation-->
            <div class="navbar-inner container">
                <ul class="nav-primary">
                    <li>
                        <div class="overflow-menu">
                            <button class="button-overflow-menu js-dropdown js-dropdown--responsive-collapse"
                                data-js-target="#headeroverflow1" aria-haspopup="true"
                                aria-expanded="false">
                                <span>Oversigt</span>
                            </button>
                            <div class="overflow-menu-inner" id="headeroverflow1" aria-hidden="true">
                                <ul class="overflow-list">
                                    <li>
                                        <a href="/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-oversigt">Overssigtsside som liste</a>
                                    </li>
                                    <li>
                                        <a href="/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-oversigt-2">Oversigt med cards</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Eksempler">
                            <span>Beskeder</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Kom godt i gang">
                            <span>Udbetalinger</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Fællesoffentlige krav">
                            <span>Sager</span>
                        </a>
                    </li>
                    <li>
                        <a href="/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-1"
                            class="nav-link current" title="Fællesoffentlige krav">
                            <span>Ansøgninger</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Fællesoffentlige krav">
                            <span>Ændringer</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Fællesoffentlige krav">
                            <span>Dokumentation</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 3: Main navigation end-->

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

<main class="container page-container">

    <div class="overflow-menu  overflow-menu--open-right ">
        <button class="button-overflow-menu js-dropdown " data-js-target="#overflow_steps"
            aria-haspopup="true" aria-expanded="false">
            Trin 2 af 6
            <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
            <span class="sr-only">Åbner overflow menu</span>
        </button>
        <div class="overflow-menu-inner" id="overflow_steps" aria-hidden="true">

            <ul class='sidenav-list'>
                <li>
                    <a href='/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-1'>
                        1. Hvilke børn søger du tilskud til?
                        <span class='sidenav-icon'>
                            <svg class='icon-svg'><use xlink:href='#check'></use></svg>
                        </span>
                    </a>
                </li>
                <li>
                    <a href='/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-2'
                        class='active'>
                        2. Hvornår blev du eller bliver du enlig?
                    </a>
                </li>
                <li>
                    <a href='#'>
                        3.
                    </a>
                </li>
                <li>
                    <a href='#'>
                        4.
                    </a>
                </li>
                <li>
                    <a href='#'>
                        5.
                    </a>
                </li>
                <li>
                    <a href='#'>
                        6.
                    </a>
                </li>
            </ul>

        </div>
    </div>

    <section class="page-content content">
        <h1 class="mt-0">Hvornår blev du eller bliver du enlig?</h1>

        <div class="alert alert-info alert--paragraph" role="alert" aria-label="Adresse info">
            <div class="alert-body">
                <p class="alert-heading">For at du kan modtage børnetilskud til enlige, skal du være
                    enlig forsørger</p>
                <p>Du er enlig forsørger, når du ikke får økonomisk og praktisk
                    hjælp fra en anden person over 18 år, som du kan blive gift
                    med.</p>
                <a class="icon-link" href='#'>Læs mere om, hvornår du er enlig forsøger på borger.dk/enlig
                    <svg
                        class="icon-svg ">
                        <use xlink:href="#open-in-new"></use>
                        </svg>
                </a>
            </div>
        </div>
        <div class="mt-7">

            <fieldset>
                <div class="form-group">
                    <label class="form-label icon-link">Jeg blev eller bliver enlig:</label>
                    <span class="form-hint"></span>
                    <span class="input-error-message" id="input-error-message-input-error" role="alert"></span>
                    <div class="date-group js-calendar-group mt-3">
                        <div class="form-group form-group-day">
                            <label class="form-label" for="date_of_day_2">Dato</label>
                            <input class="form-input js-calendar-day-input" type="tel" min="1" max="31"
                                maxlength="2" pattern="^[0-9]{0,2}$" data-input-regex="^[0-9]{0,2}$"
                                title="Indskriv dag på månenden som tal">
                        </div>
                        <div class="form-group form-group-month">
                            <label class="form-label" for="date_of_month_1">Måned</label>
                            <input class="form-input js-calendar-month-input" type="tel" min="1" max="12"
                                maxlength="2" pattern="^[0-9]{0,2}$" data-input-regex="^[0-9]{0,2}$"
                                title="Indskriv månedens nummer">
                        </div>
                        <div class="form-group form-group-year ">
                            <label class="form-label" for="date_of_year_3">År</label>
                            <input class="form-input js-calendar-year-input" type="tel" min="1900" max="3000"
                                maxlength="4" pattern="^[0-9]{0,4}$" data-input-regex="^[0-9]{0,4}$"
                                title="Indskriv årstal">
                        </div>
                        <button class="button-unstyled button-open-calendar js-calendar-datepicker">

                            <svg class="icon-svg "><use xlink:href="#calendar"></use></svg>

                        </button>
                    </div>
                </div>
            </fieldset>

        </div>
    </section>
    <footer class="page-footer">
        <div class="button-column">
            <a href="#" class="button button-primary">Næste</a>
            <a href="/frontend-styleguide/pages/page-templates/boernetilskud/boernetilskud-1"
                class="button button-ghost">Tilbage</a>
        </div>
    </footer>
</main>

<footer>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6 footer-col">
                    <div class=" align-text-left ">
                        <ul class="unstyled-list">
                            <li>
                                <span class="h6 weight-semibold">Ansvarlig myndighed</span>
                            </li>
                            <li>
                                <p>Styrelsen for Eksempel</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 footer-col">
                    <div class=" align-text-right  ">
                        <ul class="unstyled-list">
                            <li>
                                <a class="function-link" href="mailto:support@example.dk">support@example.dk</a>
                            </li>
                            <li>
                                <a class="function-link" href="tel:12 34 56 78">12 34 56 78</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>