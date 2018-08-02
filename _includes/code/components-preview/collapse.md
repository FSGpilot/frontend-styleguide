--- 
permalink: /preview-components/collapse.html
layout: iframed 
title: Collapse.html
---
<div class="p-4">

    <div class="form-group">
        <input id="id-comments-3" type="checkbox" name="Name" value="Value" class=" checkbox-large">
        <label for="id-comments-3" class="js-collapse" data-js-target='#collapse-check'
            aria-controls='collapse-check' aria-expanded='false'>Collapse checkbox</label>
    </div>

    <div id="collapse-check" aria-hidden="true" class="box-border-l collapsed">
        <div class="py-4">
            <p>Content of collapsible check</p>
            <p>Content of collapsible check</p>
            <p>Content of collapsible check</p>
        </div>
    </div>

    <div class="form-group">
        <input id="id-radio" type="radio" name="Name" value="Value" class=" radio-large">
        <label for="id-radio" class="js-collapse" data-js-target='#collapse-radio' aria-controls='collapse-radio'
            aria-expanded='false'>Collapse radiobutton</label>
    </div>

    <div id="collapse-radio" aria-hidden="true" class="box-border-l collapsed">
        <div class="py-4">
            <p>Content of collapsible radiobutton</p>
            <p>Content of collapsible radiobutton</p>
            <p>Content of collapsible radiobutton</p>
        </div>
    </div>
</div>