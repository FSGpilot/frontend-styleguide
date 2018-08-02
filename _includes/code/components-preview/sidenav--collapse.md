--- 
permalink: /preview-components/sidenav--collapse.html
layout: iframed 
title: Sidenav--collapse.html
---
<div class="container">
    <div class="row">
        <div class="col-12">
            <h4 class="my-4">Responsive collapsible sidebar</h4>
        </div>
        <div class="col-12 sidebar-col">
            <div>
                <button class="button button-primary mb-4 d-md-none js-collapse" data-js-target="#sidenav1"
                    aria-controls="sidenav1" aria-expanded="false">Vis menu</button>
                <nav class="d-md-block collapsed" id="sidenav1" aria-hidden="true">
                    <ul class="sidenav-list">

                        <li>
                            <a href="">
                                Parent link
                            </a>

                        </li>

                        <li>
                            <a href="" class="current">
                                Current page
                            </a>

                            <ul class="sidenav-sub_list">

                                <li>
                                    <a href="">
                                        Child link
                                    </a>

                                </li>

                                <li>
                                    <a href="" class="current">
                                        Child link
                                    </a>

                                    <ul class="sidenav-sub_list">

                                        <li>
                                            <a href="">
                                                Grandchild link
                                            </a>

                                        </li>

                                        <li>
                                            <a href="">
                                                Grandchild link
                                            </a>

                                        </li>

                                        <li>
                                            <a href="" class="active">
                                                Grandchild link
                                            </a>

                                        </li>

                                        <li>
                                            <a href="">
                                                Grandchild link
                                            </a>

                                        </li>

                                    </ul>

                                </li>

                                <li>
                                    <a href="">
                                        Child link
                                    </a>

                                </li>

                                <li>
                                    <a href="">
                                        Child link
                                    </a>

                                </li>

                                <li>
                                    <a href="">
                                        Child link
                                    </a>

                                </li>

                            </ul>

                        </li>

                        <li>
                            <a href="">
                                Another link
                            </a>

                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>