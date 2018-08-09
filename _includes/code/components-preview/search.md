--- 
permalink: /preview-components/search.html
layout: iframed 
title: Search.html
---
<div class="container">
    <form action="/search" method="get" role="search">
        <div class="form-group search">
            <input class="form-input input-char-27" id="input-type-text" name="" title="Search"
                type="search">
            <button class="button button-primary">Søg</button>
        </div>
    </form>

    <form action="/search" method="get" role="search" class="mt-4">
        <div class="form-group search">
            <input class="form-input input-width-xs" id="input-type-text" name="" title="Search"
                type="search">
            <button class="button button-primary ">
                <svg class="icon-svg "><use xlink:href="#magnify"></use></svg>
                <span class="sr-only">Søg</span>
            </button>
        </div>
    </form>
</div>