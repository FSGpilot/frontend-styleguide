--- 
permalink: /preview-components/sidenav--nav-dropdown.html
layout: iframed 
title: Sidenav--nav-dropdown.html
---
<div class="container">
    <div class="row">
        <div class="col-12">
            <h4 class="my-4">Sidebar i dropdown</h4>
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

            <div style="padding-bottom: 240px;"></div>
        </div>
    </div>
</div>