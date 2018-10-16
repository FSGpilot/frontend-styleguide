--- 
permalink: /preview-components/example-flytning-page-2.html
layout: iframed 
title: Example-flytning-page-2.html
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
                    Digital flytning
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h5 authority-name"> Styrelsen for Eksempler</h6>

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

<main class="container page-container">

    <div class="overflow-menu  overflow-menu--open-right ">
        <button class="button-overflow-menu js-dropdown " data-js-target="#overflow_steps"
            aria-haspopup="true" aria-expanded="false">
            Trin 2 af 5
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
                    <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-2'
                        class='active'>
                        2. Personer
                    </a>
                </li>
                <li>
                    <a href='/frontend-styleguide/pages/page-templates/digital-flytning/flytning-3'>
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

    <h1>Personer</h1>
    <p class="font-lead">Her kan du vælge hvilke personer i din husstand du ønsker at anmelde flytning
        for. Din eventuelle ægtefælle og eventuelle børn kan vælges.</p>
    <p class="mt-6">Hvis der er flere personer i din husstand, som skal medtages i flytteanmeldelsen,
        skal de tilføjes særskilt ved angivelse af CPR-nr. Angiv maks 5 cpr-numre
        (10 cifre uden bindestreg)</p>
    <a href="#" class="icon-link">Regler i forbindelse med flytning når vi har børn sammen<svg class="icon-svg "><use xlink:href="#open-in-new"></use></svg></a>
    <h2 class="mt-7">Valgte personer</h2>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8">
            <table class="table table--borderless table--compact table--responsive-headers mt-3 mb-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>Navn</th>
                        <th>CPR nummer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="form-group ">
                                <input id="id-person-1" type="checkbox" name="Checkbox for Klaus" value="" class="  "
                                    disabled checked>
                                <label for="id-person-1" class="checkbox"></label>
                            </div>
                        </td>
                        <td>Klaus Egegreen Hansen</td>
                        <td>090889-2210</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-group ">
                                <input id="id-person-2" type="checkbox" name="Checkbox for Line" value="" class="  ">
                                <label for="id-person-2" class=""></label>
                            </div>
                        </td>
                        <td>Line Von Larsen</td>
                        <td>240789-4695</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <button class="button button-secondary">
            <svg class="icon-svg "><use xlink:href="#add"></use></svg> Tilføj
            personer</button>
    </div>

    <nav class="page-navigation">
        <a href="/frontend-styleguide/pages/page-templates/digital-flytning/flytning-3"
            class="button button-primary">Næste</a>
        <a href="/frontend-styleguide/pages/page-templates/digital-flytning/flytning-1"
            class="button button-ghost">Tilbage</a>
    </nav>
</main>

<footer>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-12 col-md-6 footer-col">
                    <div class=" align-text-left ">
                        <ul class="unstyled-list">
                            <li>
                                <span class="h5 weight-semibold">Ansvarlig myndighed</span>
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

<div class="modal" id="modal-contact" aria-hidden="true">
    <div class="modal__overlay bg-modal" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-contact-1">
            <header class="modal__header">
                <h1 class="modal__title h2" id="modal-contact-1">
                    Kontakt
                </h1>
            </header>
            <main class="modal__content">
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