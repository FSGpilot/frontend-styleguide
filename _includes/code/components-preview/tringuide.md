--- 
permalink: /preview-components/tringuide.html
layout: iframed 
title: Tringuide.html
---
<div class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 sidebar-col">
            <p class="h6 mt-6">Klikbar trinindikator</p>

            <ul class="sidenav-list">

                <li>
                    <a href="">
                        1. Trin 1

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                    </a>
                </li>

                <li>
                    <a href="">
                        2. Trin 2

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                    </a>
                </li>

                <li>
                    <a href="" class="active">
                        3. Trin 3 (valgt)

                    </a>
                </li>

                <li>
                    <a href="">
                        4. Trin 4

                    </a>
                </li>

                <li>
                    <a href="">
                        5. Trin 5

                    </a>
                </li>

            </ul>

        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 sidebar-col">
            <p class="h6 mt-6">Låst trinindikator</p>

            <ul class="sidenav-list-locked">

                <li class="disabled">
                    <a disabled tab-index="-1" aria-disabled="true">
                        1. Trin 1

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                    </a>
                </li>

                <li class="disabled">
                    <a disabled tab-index="-1" aria-disabled="true">
                        2. Trin 2

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                    </a>
                </li>

                <li class="disabled">
                    <a class="active" disabled tab-index="-1" aria-disabled="true">
                        3. Trin 3 (valgt)

                    </a>
                </li>

                <li class="disabled">
                    <a disabled tab-index="-1" aria-disabled="true">
                        4. Trin 4

                    </a>
                </li>

                <li class="disabled">
                    <a disabled tab-index="-1" aria-disabled="true">
                        5. Trin 5

                    </a>
                </li>

            </ul>

        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 sidebar-col">
            <p class="h6 mt-6">Trinindikator med information</p>

            <ul class="sidenav-list">

                <li>
                    <a href="">
                        1. Trin 1

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                        <p class="sidenav-information">Informationstekst for trin 1</p>

                    </a>
                </li>

                <li>
                    <a href="">
                        2. Trin 2

                        <span class="sidenav-icon">

                            <svg class="icon-svg "><use xlink:href="#check"></use></svg>

                        </span>

                        <p class="sidenav-information">Informationstekst for trin 2</p>

                    </a>
                </li>

                <li>
                    <a href="" class="active">
                        3. Trin 3 (valgt)

                        <p class="sidenav-information">Informationstekst for trin 3</p>

                    </a>
                </li>

                <li>
                    <a href="">
                        4. Trin 4

                        <p class="sidenav-information">Informationstekst for trin 4</p>

                    </a>
                </li>

                <li>
                    <a href="">
                        5. Trin 5

                        <p class="sidenav-information">Informationstekst for trin 5</p>

                    </a>
                </li>

            </ul>

        </div>
    </div>
    <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 sidebar-col">

            <p class="h6 mt-6">Trinindikator i overflow-menu</p>

            <div class="overflow-menu  overflow-menu--open-right ">
                <button class="button-overflow-menu js-dropdown " data-js-target="#overflow5"
                    aria-haspopup="true" aria-expanded="false">
                    Trin 3 af 5
                    <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
                    <span class="sr-only">Åbner overflow menu</span>
                </button>
                <div class="overflow-menu-inner" id="overflow5" aria-hidden="true">

                    <ul class='sidenav-list'>
                        <li>
                            <a href='#'>
                                1. Trin 1
                                <span class='sidenav-icon'>
                                    <svg class='icon-svg'><use xlink:href='#check'></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                2. Trin 2
                                <span class='sidenav-icon'>
                                    <svg class='icon-svg'><use xlink:href='#check'></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href='#' class='active'>
                                3. Trin 3 (valgt)
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                4. Trin 4
                            </a>
                        </li>
                        <li>
                            <a href='#'>
                                5. Trin 5
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 sidebar-col">
            <p class="h6 mt-6 mb-3">Trinindikator - responsivt i overflow-menu</p>
            <p class="form-hint mt-0">Du skal gøre browservinduet mindre for at se ændringen</p>
            <div class="overflow-menu  overflow-menu--open-right overflow-menu--md-no-responsive">
                <button class="button-overflow-menu js-dropdown " data-js-target="#overflow4"
                    aria-haspopup="true" aria-expanded="false">
                    Trin 3 af 5
                    <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
                    <span class="sr-only">Åbner overflow menu</span>
                </button>
                <div class="overflow-menu-inner" id="overflow4" aria-hidden="true">
                    <ul class="sidenav-list">
                        <li>
                            <a href="#">
                                1. Trin 1
                                <span class="sidenav-icon">
                                    <svg class="icon-svg"><use xlink:href="#check"></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                2. Trin 2
                                <span class="sidenav-icon">
                                    <svg class="icon-svg"><use xlink:href="#check"></use></svg>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="active">
                                3. Trin 3 (valgt)
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                4. Trin 4
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                5. Trin 5
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div style="padding-bottom: 240px;"></div>
    </div>
</div>