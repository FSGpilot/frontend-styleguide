--- 
permalink: /preview-components/example-aes-page-10.html
layout: iframed 
title: Example-aes-page-10.html
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

                <p class="user"><b class="username">Christian Emil Vestergaard Christiansen<br><span class="weight-normal">Forsikringens Forsikringsfirma</span></b>                    </p>

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
                    <p>Support: 72 20 60 00 ·
                        <button class="button-unstyled button-contact"
                            data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
                    </p>
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
            <p class="user"><b>Christian Emil Vestergaard Christiansen</b><br>Forsikringens
                Forsikringsfirma</p>
            <a href="#" class="button button-secondary button-signout">
                Log ud
            </a>
        </div>

        <div class="solution-info-mobile">
            <p><b>Erhvervsministeriet</b></p>
            <p>Support: 72 20 60 00 <br>
                <button class="button-unstyled button-contact"
                    data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
            </p>
        </div>
    </nav>
    <!-- collapsible nav end-->
</header>

<section class="container page-container">

    <div class="alert alert alert-success alert--show-icon" role="alert" aria-label="success">
        <div class="alert-body">
            <p class="alert-heading">Sagen er sendt til AES</p>
            <p class="alert-text"></p>
        </div>
    </div>

    <div class="alert alert alert-warning alert--show-icon" role="alert" aria-label="warning">
        <div class="alert-body">
            <p class="alert-heading">Husk betaling</p>
            <p class="alert-text">Gebyret skal indsættes på vores konto i banken</p>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="content">
                <h1 class="mb-0 mt-5">Kvittering</h1>
                <p class="form-hint mt-2">Referencenummer: 28346863</p>
                <div class="mt-0 mb-4">
                    <p>Hvis du ønsker dokumentation på fremsendelse kan du downloade
                        anmodningen.</p>
                </div>
                <button class="button button-secondary">
                    <svg class="icon-svg "><use xlink:href="#download"></use></svg>                    Download kvittering som pdf</button>
                <h2 class="h5 mt-7 mb-5">Hvad sker der nu</h2>
                <p>Sagens parter vil indenfor 7 hverdage modtage en kvittering
                    med journalnummer og oplysninger om, hvornår AES forventer
                    at have en udtalelse klar.</p>
                <h2 class="h5 mt-7 mb-5">Husk betaling</h2>
                <p class="mt-0 mb-0">Gebyret for udtalelsen skal sættes ind på vores konto i Danske
                    Bank:</p>
                <div class="row">
                    <div class="col-12 col-sm-3 col-md-3 col-lg-3">
                        <table class="table table--borderless table--compact">
                            <tbody>
                                <tr>
                                    <td class="weight-semibold">Reg.nr.:</td>
                                    <td>0216</td>
                                </tr>
                                <tr>
                                    <td class="weight-semibold">Kontonr.:</td>
                                    <td>4069068936</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="mt-4">
                    <p class="mt-0 mb-0">Gebyr: 6.220 kr.</p>
                    <p class="mt-0 mb-0">Ved overførslen skal I oplyse skadelidtes CPR-nr.: 1702671913</p>
                </div>
                <h2 class="h5">Ved spørgsmål eller supplerende oplysninger</h2>
                <div class="mt-4">
                    <p class="mt-0 mb-0">Kontakt AES på aes@aes.dk eller 72 00 60 00</p>
                    <p class="mt-0 mb-0">Referencenummer: 28346863</p>
                </div>
                <br>
                <button class="button button-secondary mt-5">Opret ny sag</button>
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