--- 
permalink: /preview-components/example-praktikplads-page-3.html
layout: iframed 
title: Example-praktikplads-page-3.html
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

                <p class="user"><b class="username">Jens Jensen</b> </p>

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
                    Praktikplads AUB
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h6 authority-name"> Praktikplads-AUB</h6>

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

        <!-- 3: Main navigation-->
        <div class="navbar navbar-primary">
            <!--3A: Main navigation-->
            <div class="navbar-inner container">
                <ul class="nav-primary">
                    <li>
                        <a href="/frontend-styleguide/pages/page-templates/praktikplads/praktikplads-1"
                            class="nav-link" title="Designsystem">
                            <span>2021</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="2020">
                            <span>2020</span>
                        </a>
                    </li>
                    <li>
                        <div class="overflow-menu">
                            <button class="current button-overflow-menu js-dropdown js-dropdown--responsive-collapse"
                                data-js-target="#headeroverflow1" aria-haspopup="true"
                                aria-expanded="false">
                                <span>2019</span>
                            </button>
                            <div class="overflow-menu-inner" id="headeroverflow1" aria-hidden="true">
                                <ul class="overflow-list">
                                    <li>
                                        <a href="/frontend-styleguide/pages/page-templates/praktikplads/praktikplads-2">Revision 3: Regulering<br> oprettet
                                            01-12-2019</a>
                                    </li>
                                    <li>
                                        <a href="/frontend-styleguide/pages/page-templates/praktikplads/praktikplads-2">Revision 2: Regulering<br> oprettet
                                            01-09-2019</a>
                                    </li>
                                    <li>
                                        <a href="/frontend-styleguide/pages/page-templates/praktikplads/praktikplads-2">Revision 1: Opgørelse<br> oprettet 01-06-2019</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="2018">
                            <span>2018</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 3: Main navigation end-->
        <!-- Nav actions-->
        <div class="navbar">
            <div class="navbar-inner navbar-context-actions container">
                <div class="nav-actions">
                    <a href="#" class="function-link">
                        <svg class="icon-svg "><use xlink:href="#printer"></use></svg>                        Udskriv
                    </a>
                    <a href="" class="function-link">
                        <svg class="icon-svg "><use xlink:href="#help-circle-outline"></use></svg>                        Hjælp
                    </a>
                </div>
            </div>
        </div>

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
    <header class="page-header">
        <h1>Forskudsopgørelse 2019</h1>
        <p class="font-lead">I får udbetalt Praktikplads-AUB:
            <span class="text-positive">18.316,00 kr.</span>
        </p>

    </header>
    <section class="page-content content">
        <h2>Jeres elevpoint</h2>
        <p class="mt-4 mb-0">Her kan I se, om I har opfyldt jeres mål for elevpoint for 2019.</p>
        <div class="row">
            <div class="col-12 col-sm-12 col-md-8 col-lg-8">
                <table class="table table--borderless table--responsive-headers mt-9">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Beregnede erhvervsuddannede</th>
                            <th>Faktor</th>
                            <th>Elevpoint</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jeres mål for elevpoint</td>
                            <td>28,38</td>
                            <td>x 0,25</td>
                            <td>= 7,09</td>
                        </tr>
                        <tr>
                            <td>Jeres opnåede elevpoint</td>
                            <td>28,38</td>
                            <td>x 0,24</td>
                            <td>= 6,94</td>
                        </tr>
                        <tr>
                            <td>I mangler</td>
                            <td>6,94</td>
                            <td>- 7,09</td>
                            <td>= 0,15</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h2 class="mt-7 mb-0">Jeres Praktikplads - AUB</h2>
        <p class="mt-4 mb-0">Praktikplads-AUB er det endelige beløb i jeres årsopgørelse.</p>
        <div class="row">
            <div class="col-12">
                <table class="table table--borderless table--responsive-headers mt-7">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Elevpoint</th>
                            <th>Sats</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Ekstra bidrag til Praktikplads-AUB</td>
                            <td>-0,15</td>
                            <td>x 27.000,00</td>
                            <td>= -4.171,00</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table--borderless table--responsive-headers mt-7">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Helårselev</th>
                            <th>Sats</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nedsættelse for ubesat praktikplads</td>
                            <td>-0,15</td>
                            <td>x 27.000,00</td>
                            <td>= -4.171,00</td>
                        </tr>
                        <tr>
                            <td>Bidrag for underskud i jeres sektor</td>
                            <td>0,00</td>
                            <td>x 0,00</td>
                            <td>= 0,00</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table--borderless table--responsive-headers mt-7">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Erhvervsuddannede - 1</th>
                            <th>Sats</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bidrag for underskud i jeres sektor</td>
                            <td>29,16</td>
                            <td>x 350,00</td>
                            <td>= -10.206,00</td>
                        </tr>
                        <tr>
                            <td>Nedsættelse for erhvervsuddannede medarbejdere</td>
                            <td>29,16</td>
                            <td>x 295,00</td>
                            <td>= 8.602,00</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table--borderless table--responsive-headers mt-7">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Helårselev</th>
                            <th>Sats</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bonus for elever fra fordelsuddannelser</td>
                            <td>-3,00</td>
                            <td>x 6.640,00</td>
                            <td>= 19.920,00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <p class="mt-7 mb-0">Udbetaling af Praktikplads-AUB for 2019: <b>18.316,00</b></p>
        <p class="mt-4 mb-0">Hvis du har spørgsmål, er du velkommen til at
            <a href="#">kontakte AUB</a>
        </p>
    </section>
</main>

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