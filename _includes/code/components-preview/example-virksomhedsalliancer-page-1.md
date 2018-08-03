--- 
permalink: /preview-components/example-virksomhedsalliancer-page-1.html
layout: iframed 
title: Example-virksomhedsalliancer-page-1.html
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
                    Strategiske virksomhedsalliancer
                </a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->

                <h6 class="h6 authority-name"> Ansvarlig myndighed</h6>

                <p>
                    <button class="button-unstyled button-contact" data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
                </p>

            </div>
        </div>
    </div>

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
    </nav>
    <!-- collapsible nav end-->
</header>

<section class="container page-container">
    <div class="row">
        <div class="col-12">

            <div class="overflow-menu  overflow-menu--open-right ">
                <button class="button-overflow-menu js-dropdown " data-js-target="#overflow_steps"
                    aria-haspopup="true" aria-expanded="false">
                    Trin 1 af 4
                    <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
                    <span class="sr-only">Åbner overflow menu</span>
                </button>
                <div class="overflow-menu-inner" id="overflow_steps" aria-hidden="true">

                    <ul class='sidenav-list'>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/strategiske-virksomhedsalliancer/virksomhedsalliancer-1'
                                class='active'>
                                1. Stamdata
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/strategiske-virksomhedsalliancer/virksomhedsalliancer-2'>
                                2. SMV-kriterier
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/strategiske-virksomhedsalliancer/virksomhedsalliancer-3'>
                                3. Statsstøtte
                            </a>
                        </li>
                        <li>
                            <a href='/frontend-styleguide/pages/page-templates/strategiske-virksomhedsalliancer/virksomhedsalliancer-4'>
                                4. Tilskud til land
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

            <div class="content">
                <h1>Stamdata</h1>
                <div class="mt-0">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-cvr-number">CVR nummer</label>

                        <input class="form-input  input-char-8" placeholder="" id="id-cvr-number" value=""
                            name="Input til cvr nummer" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companyname">Navn på virksomhed</label>

                        <input class="form-input  input-width-m" placeholder="" id="id-companyname"
                            value="" name="Input til navn på virksomhed" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companyaddress">Adresse</label>

                        <input class="form-input  input-width-m" placeholder="" id="id-companyaddress"
                            value="" name="Input til virksomhedsadresse" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-zipcode">Postnr.</label>

                        <input class="form-input  input-char-4" placeholder="" id="id-zipcode" value=""
                            name="Input til postnummer" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companycity">By</label>

                        <input class="form-input  input-width-m" placeholder="" id="id-companycity"
                            value="" name="Input til by" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companyphone">Telefonnr.</label>

                        <input class="form-input  input-char-8" placeholder="" id="id-companyphone"
                            value="" name="Input til telefonnummer" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companywebsite">Website
                            <span class="weight-normal"> (frivilligt)</span>
                        </label>

                        <input class="form-input  input-width-m" placeholder="" id="id-companywebsite"
                            value="" name="Input til website" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-company-contactperson">Kontaktperson.</label>

                        <input class="form-input  input-width-m" placeholder="" id="id-company-contactperson"
                            value="" name="Input til kontaktperson" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-companyemail">E-mail</label>

                        <span class="form-hint" id="input-hint-message-id-companyemail">Kvittering bliver sendt til denne e-mailadresse</span>
                        <input class="form-input  input-width-m" placeholder="" id="id-companyemail"
                            value="" name="Input til email" type="text">
                    </div>

                </div>
                <div class="mt-6">

                    <div class="form-group">
                        <label class="form-label icon-link " for="id-launchyear">Etableringsår</label>

                        <input class="form-input  input-char-4" placeholder="" id="id-launchyear" value=""
                            name="Input til etableringsår" type="text">
                    </div>

                </div>

                <a href="/frontend-styleguide/pages/page-templates/strategiske-virksomhedsalliancer/virksomhedsalliancer-2"
                    class="button button-primary mt-7">Næste</a>

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
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
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