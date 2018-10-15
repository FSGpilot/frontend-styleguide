--- 
permalink: /preview-components/radio-toggle-content.html
layout: iframed 
title: Radio-toggle-content.html
---
<div class="container js-radio-toggle-group">

    <div class="form-group ">
        <input id="id-radio1" type="radio" name="radio-group1" value="Value" class=" radio-large "
            checked data-js-target='#collapse-radio1' aria-controls='collapse-radio1'
            aria-expanded='false'>
        <label for="id-radio1" class="">Radioknap viser indhold</label>
    </div>

    <div id="collapse-radio1" aria-hidden="true" class="box-border-l collapsed">
        <div class="py-4">
            <p>Dette indhold bliver vist når radio-knappen er valgt.</p>
        </div>
    </div>

    <div class="form-group ">
        <input id="id-radio2" type="radio" name="radio-group1" value="Value" class=" radio-large "
            data-js-target='#collapse-radio2'>
        <label for="id-radio2" class="">Radioknap viser indhold</label>
    </div>

    <div id="collapse-radio2" aria-hidden="true" class="box-border-l collapsed">
        <div class="py-4">
            <p>Dette indhold bliver vist når radio-knappen er valgt.</p>
        </div>
    </div>
</div>