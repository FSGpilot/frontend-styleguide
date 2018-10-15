--- 
permalink: /preview-components/header-medium.html
layout: iframed 
title: Header-medium.html
---
<header class="header" role="banner">

    <!--1A: Portal header -->
    <div class="portal-header">
        <div class="container portal-header-inner">
            <a href="#" title="Home" aria-label="Home" class="logo"></a>
            <button class="button button-tertiary button-menu-open js-menu-open ml-auto"
                aria-haspopup="menu" title="Åben mobil menu">Menu</button>

            <!-- 1B: Portal header: info + actions-->
            <div class="portal-info">
                <p class="user"><b class="username">Christian Emil Vestergaard Christensen</b>                    · Københavns Urmager og Værksted v/Martin Elsig</p>
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
                <a href="#" title="Home" aria-label="Home">En længere løsningstitel</a>
            </div>

            <!--2B: Solution header: Authority name + text-->
            <div class="solution-info">
                <!-- nav-secondary -->
                <h6 class="h6 authority-name">Myndighedsnavn</h6>
                <p>Support: 12 34 56 78 ·
                    <button class="button-unstyled button-contact"
                        data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
                </p>
            </div>
        </div>
    </div>

    <div class="overlay"></div>
    <nav role="navigation" class=" nav">
        <!-- collapsible-->
        <button class="button button-secondary button-menu-close js-menu-close" title="Luk mobil menu">
            <svg class="icon-svg "><use xlink:href="#close"></use></svg> Luk
        </button>
        <!-- 3: Main navigation-->
        <div class="navbar navbar-primary">
            <!--3A: Main navigation-->
            <div class="navbar-inner container">
                <ul class="nav-primary">
                    <li>
                        <a href="#" class="nav-link" title="Designsystem">
                            <span>Første menupunkt</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="current nav-link" title="Eksempler">
                            <span>Andet menupunkt</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Kom godt i gang">
                            <span>Tredje menupunkt</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link" title="Fællesoffentlige krav">
                            <span>Fjerde menupunkt</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 3: Main navigation end-->

        <!-- 5: Contextual actions-->
        <div class="navbar">
            <div class="navbar-inner navbar-context-actions container">
                <div class="nav-actions">
                    <a href="" class="function-link">
                        <svg class="icon-svg "><use xlink:href="#printer"></use></svg>                        Funktionsikon
                    </a>
                </div>
            </div>
        </div>
        <!-- 5: Contextual actions end-->

        <div class="portal-info-mobile">
            <p class="user"><b>Ida Ester Petersen</b></p>
            <a href="#" class="button button-secondary button-signout">
                Log ud
            </a>
        </div>

        <div class="solution-info-mobile">
            <h6 class="h6 authority-name">Myndighedsnavn</h6>
            <p>Support: 12 34 56 78 ·
                <button class="button-unstyled button-contact"
                    data-micromodal-trigger="modal-contact">Kontakt<svg class="icon-svg "><use xlink:href="#menu-right"></use></svg></button>
            </p>
        </div>

    </nav>
    <!-- collapsible nav end-->
</header>

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