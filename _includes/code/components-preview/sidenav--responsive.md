--- 
permalink: /preview-components/sidenav--responsive.html
layout: iframed 
title: Sidenav--responsive.html
---
<div class="container">
    <div class="row">
        <div class="col-12">
            <h4 class="my-4">Sidenav is toggeled with collapse.</h4>
            <p>The browser needs to be less than 768px wide in order for the responsive
                behaviour to appear.</p>
        </div>
        <div class="col-12 sidebar-col">
            <div>
                <button class="button button-primary mb-4 d-md-none js-collapse" data-js-target="#sidenav1"
                    aria-controls="sidenav1" aria-expanded="false">Vis menu</button>
                <nav class="d-md-block collapsed" id="sidenav1" aria-hidden="true">
                    <ul class="sidenav-list">

                        <li>
                            <a href="">

                                <div class="d-inline-block">
                                    Parent link

                                </div>
                            </a>

                        </li>

                        <li>
                            <a href="" class="current">

                                <div class="d-inline-block">
                                    Current page

                                </div>
                            </a>

                            <ul class="sidenav-sub_list">

                                <li>
                                    <a href="">

                                        <div class="d-inline-block">
                                            Child link

                                        </div>
                                    </a>

                                </li>

                                <li>
                                    <a href="" class="current">

                                        <div class="d-inline-block">
                                            Child link

                                        </div>
                                    </a>

                                    <ul class="sidenav-sub_list">

                                        <li>
                                            <a href="">

                                                <div class="d-inline-block">
                                                    Grandchild link

                                                </div>
                                            </a>

                                        </li>

                                        <li>
                                            <a href="">

                                                <div class="d-inline-block">
                                                    Grandchild link

                                                </div>
                                            </a>

                                        </li>

                                        <li>
                                            <a href="" class="active">

                                                <div class="d-inline-block">
                                                    Grandchild link

                                                </div>
                                            </a>

                                        </li>

                                        <li>
                                            <a href="">

                                                <div class="d-inline-block">
                                                    Grandchild link

                                                </div>
                                            </a>

                                        </li>

                                    </ul>

                                </li>

                                <li>
                                    <a href="">

                                        <div class="d-inline-block">
                                            Child link

                                        </div>
                                    </a>

                                </li>

                                <li>
                                    <a href="">

                                        <div class="d-inline-block">
                                            Child link

                                        </div>
                                    </a>

                                </li>

                                <li>
                                    <a href="">

                                        <div class="d-inline-block">
                                            Child link

                                        </div>
                                    </a>

                                </li>

                            </ul>

                        </li>

                        <li>
                            <a href="">

                                <div class="d-inline-block">
                                    Another link

                                </div>
                            </a>

                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="container mt-6">
    <div class="row">
        <div class="col-12">
            <h4 class="my-4">Sidenav i dropdown</h4>
        </div>
        <div class="col-12">

            <div class="overflow-menu  overflow-menu--open-right ">
                <button class="button-overflow-menu js-dropdown  js-dropdown--responsive-collapse "
                    data-js-target="#overflow3" aria-haspopup="true" aria-expanded="false">
                    Trin 3 af 5
                    <svg class="icon-svg"><use xlink:href="#menu-down"></use></svg>
                    <span class="sr-only">Åbner overflow menu</span>
                </button>
                <div class="overflow-menu-inner" id="overflow3" aria-hidden="true">

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

            <div style="padding-bottom: 40px;"></div>
        </div>
    </div>
</div>