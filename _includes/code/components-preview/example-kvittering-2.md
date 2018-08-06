--- 
permalink: /preview-components/example-kvittering-2.html
layout: iframed 
title: Example-kvittering-2.html
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
                    Vejledende udtalelse fra AES i privat erstatningssag
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
            <p class="user"><b>Christian Emil Vestergaard Christiansen</b></p>
            <p class="mt-0">Københavns Urmager Værksted v/Martin Elsig</p>
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

<section class="container  page-container">

    <div class="alert alert alert-success alert--show-icon" role="alert" aria-label="success">
        <div class="alert-body">
            <p class="alert-heading">Kvittering</p>
            <p class="alert-text">Din virksomhedsregistrering er modtaget</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12 col-lg-8">
            <div class="content">
                <h1 class="mt-5">Kvittering</h1>
                <p class="font-lead">Nedenfor finder du dine indtastninger fra de foregående sider.</p>
                <button class="button button-secondary">
                    <svg class="icon-svg "><use xlink:href="#printer"></use></svg>                    Udskriv kvittering</button>
                <h2>Dine oplysninger</h2>
                <table class="table table--borderless table--compact table--responsive-headers">
                    <tbody>
                        <tr>
                            <th class="w-percent-md-30">Virksomhedens navn</th>
                            <td>Forsikringens forsikring (enhed)</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Kontaktperson</th>
                            <td>John Doe<br>privatskade@ff.dk<br>+45 1234 5678</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Afsender er</th>
                            <td>Forsikringens forsikring (enhed)</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="h5">Oplysninger om skadelidte</h3>
                <table class="table table--borderless table--compact table--responsive-headers mt-6 mb-7">
                    <tbody>
                        <tr>
                            <th class="w-percent-md-30">Skadelidtes navn</th>
                            <td>Susanne Maria Zaggariasen</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Skadelidtes CPR</th>
                            <td>110687-1478</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="h5">Oplysninger om sagen</h3>
                <table class="table table--borderless table--compact table--responsive-headers mt-6 mb-7">
                    <tbody>
                        <tr>
                            <th class="w-percent-md-30">Sagstype</th>
                            <td>Erstatningsansvarloven</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Emne</th>
                            <td>Mén (6.220 kr.)</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Skadedato</th>
                            <td>1/10-2017</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Sagsnummer</th>
                            <td>prsk013456</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Verserende retsag</th>
                            <td>Nej</td>
                        </tr>
                        <tr>
                            <th class="w-percent-md-30">Skadelidtes advokat</th>
                            <td>Nej</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="h5">Yderligere oplysninger</h3>
                <table class="table table--borderless table--compact table--responsive-headers mt-6 mb-7">
                    <tbody>
                        <tr>
                            <th class="w-percent-md-30">Faktuelle oplysninger</th>
                            <td>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis
                                sem lacinia nonummy. Proin mollis lorem non
                                dolor. In hac habitasse platea dictumst. Nulla
                                ultrices odio. Donec augue. Phasellus dui. Maecenas
                                facilisis nisl vitae nibh. Proin vel seo est
                                vitae eros pretium dignissim. Aliquam aliquam
                                sodales orci. Suspendisse potenti. Nunc adipiscing
                                euismod arcu. Quisque facilisis mattis lacus.
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>Bilagsoversigt</h2>
                <h3 class="h5">Første undersøgelse af skade</h3>
                <table class="table table--borderless table--compact table--responsive-headers mt-6 mb-7">
                    <thead>
                        <tr>
                            <th>Original titel</th>
                            <th>Navngivning</th>
                            <th>Kommentar</th>
                            <th>Størrelse</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>prn1023152_attest.pdf</td>
                            <td>Journal fra egen læge</td>
                            <td>2/10-2017</td>
                            <td>2,3 mb</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="h5">Oplysninger om varigt mén</h3>
                <table class="table table--borderless table--compact table--responsive-headers mt-6 mb-7">
                    <thead>
                        <tr>
                            <th>Original titel</th>
                            <th>Navngivning</th>
                            <th>Kommentar</th>
                            <th>Størrelse</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>prn1023152_attest.pdf</td>
                            <td>Journal fra egen læge</td>
                            <td>2/10-2017</td>
                            <td>2,3 mb</td>
                        </tr>
                        <tr>
                            <td>prn1023152_attest.pdf</td>
                            <td>Journal fra egen læge</td>
                            <td>2/10-2017</td>
                            <td>2,3 mb</td>
                        </tr>
                    </tbody>
                </table>
                <h3 class="h5">Første undersøgelse af skade</h3>
                <table class="table table--borderless table--responsive-headers table--compact mt-6">
                    <thead>
                        <tr>
                            <th>Original titel</th>
                            <th>Navngivning</th>
                            <th>Kommentar</th>
                            <th>Størrelse</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>prn1023152_attest.pdf</td>
                            <td>Journal fra egen læge</td>
                            <td>2/10-2017</td>
                            <td>2,3 mb</td>
                        </tr>
                    </tbody>
                </table>
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