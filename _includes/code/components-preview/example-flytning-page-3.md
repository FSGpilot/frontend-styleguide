--- 
permalink: /preview-components/example-flytning-page-3.html
layout: iframed 
title: Example-flytning-page-3.html
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
                    Digital flytning
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h6 authority-name"> Styrelsen for Eksempler</h6>

                <p>
                    <button class="button-unstyled button-contact" data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
                </p>

            </div>
        </div>
    </div>

    <div class="overlay"></div>
    <nav role="navigation" class=" nav">
        <!-- collapsible-->
        <button class="button button-tertiary button-menu-close js-menu-close" title="Luk mobil menu">
            <svg class="icon-svg "><use xlink:href="#close"></use></svg> Luk
        </button>

        <div class="portal-info-mobile">
            <p class="user"><b>Navn</b></p>

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

        <div class="navbar">
            <div class="navbar-inner navbar-context-actions container">
                <div class="nav-actions">
                    <a href="#" class="function-link">
                        <svg class="icon-svg "><use xlink:href="#"></use></svg>                        Om digital flytning</a>
                    <a href="" class="function-link">
                        <svg class="icon-svg "><use xlink:href="#language"></use></svg>                        Sprog
                    </a>
                </div>
            </div>
        </div>

    </nav>
    <!-- collapsible nav end-->
</header>

<section class="container page-container">
    <div class="row">
        <div class="col-12">

            <div class="overflow-menu  overflow-menu--open-right ">
                <button class="button-overflow-menu js-dropdown " data-js-target="#overflow_steps"
                    aria-haspopup="true" aria-expanded="false">
                    Trin 3 af 5
                    <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
                    <span class="sr-only">Åbner overflow menu</span>
                </button>
                <div class="overflow-menu-inner" id="overflow_steps" aria-hidden="true">

                    <ul class='sidenav-list'>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-1'>
                                1. Oversigt
                                <span class='sidenav-icon'>
                                    <svg class='icon-svg'><use xlink:href='#check'></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-2'>
                                2. Personer
                                <span class='sidenav-icon'>
                                    <svg class='icon-svg'><use xlink:href='#check'></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-3'
                                class='active'>
                                3. Adresse
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-4'>
                                4. Særlig flytning
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-5'>
                                5. Lægevalg
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

            <div class="content">
                <h1>Adresse</h1>

                <div class="alert alert alert-warning" role="alert" aria-label="warning">
                    <div class="alert-body">
                        <p class="alert-heading">Ikke alle adresser er registreret i dette register</p>
                        <p
                            class="alert-text">Kan du ikke finde din tilflytningsadresse, bedes du
                            kontakte din tilflytningskommune.</p>
                    </div>
                </div>

                <div class="mt-6">

                    <fieldset>
                        <div class="form-group">
                            <label class="form-label icon-link">Dato for flytning</label>
                            <span class="form-hint">Fx. 28 04 1996</span>
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
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label" for="Gade / vejnavn">Gade / vejnavn</label>
                        <select class="input-width-m form-select" name="Gade / vejnavn" id="select-dokumentationdtype">
                            <option value>- Vælg -</option>

                        </select>
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label" for="Husnr. / bogstav">Husnr. / bogstav</label>
                        <select class="input-width-xxs form-select" name="Husnr. / bogstav" id="select-dokumentationdtype"
                            disabled="disabled">
                            <option value></option>

                        </select>
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label" for="Etage, side/dør">Etage, side/dør</label>
                        <select class="input-width-xxs form-select" name="Etage, side/dør" id="select-dokumentationdtype"
                            disabled="disabled">
                            <option value></option>

                        </select>
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-co">C/O navn
                            <span class="weight-normal"> (frivilligt)</span>
                        </label>
                        <span class="form-hint" id="input-hint-message-id-co">C/O navn skal kun udfyldes, hvis du skal bo til leje
                            hos de nuværende beboere.</span>

                        <input class="form-input  input-width-m" placeholder="" id="id-co" value=""
                            name="Input til C/O navn" type="text">
                    </div>

                </div>

                <a href="/frontend-styleguide/pages/page-templates/digital-flytning/flytning-4"
                    class="button button-primary mt-7">Næste</a>
                <div class="breadcrumb">
                    <a href="/frontend-styleguide/pages/page-templates/digital-flytning/flytning-2"
                        class="button button-ghost">Tilbage</a>
                </div>
            </div>
        </div>
    </div>
</section>

<footer>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6 footer-col">
                    <div class=" align-left ">
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
                    <div class=" align-right ">
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

<div class="modal" id="modal-contact" aria-hidden="true">
    <div class="modal__overlay bg-modal" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-contact-1">
            <header class="modal__header">
                <h1 class="modal__title h2" id="modal-contact-1">
                    Kontakt
                </h1>
            </header>
            <main class="modal__content content">
                <div class="alert alert-warning" role="alert" aria-label="Beskedbox der viser en advarsel">
                    <div class="alert-body">
                        <h3 class="alert-heading">Vi har noget information af advarende karakter</h3>
                        <p class="alert-text">Noget tekst, der forklarer det af advarende karakter,
                            som brugeren bør vide inden denne ringer eller skriver.
                            Noget tekst, der forklarer det af advarende karakter,
                            som brugeren bør vide inden denne ringer eller skriver.</p>
                    </div>
                </div>
                <h3>En form for support</h3>
                <p>Hvis du har spørgsmål om:</p>
                <ul>
                    <li>En ting som denne</li>
                    <li>Et andet emne som dette</li>
                </ul>
                <p>Kan du ringe direkte til: 12 34 56 78</p>
                <p>Telefonen er åben:</p>
                <p class="m-0">Mandag:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    kl. 9-17</p>
                <p class="m-0">Tirsdag-torsdag:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp kl. 9-17</p>
                <p class="m-0">Fredag:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    kl. kl. 9-14</p>
            </main>

            <button class="modal__close button button-ghost" aria-label="Close modal" data-micromodal-close>Luk</button>
        </div>
    </div>
</div>