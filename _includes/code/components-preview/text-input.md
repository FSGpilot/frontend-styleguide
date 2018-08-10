--- 
permalink: /preview-components/text-input.html
layout: iframed 
title: Text-input.html
---
<div class="container">

    <div class="form-group">
        <label class="form-label icon-link " for="input-type-text">Inputfelt med label</label>
        <span class="form-hint" id="input-hint-message-input-type-text">Fx 12345678</span>

        <input class="form-input  " placeholder="" id="input-type-text" value="" name="input-type-text"
            type="text">
    </div>

    <div class="form-group">
        <label class="form-label icon-link " for="input-focus">Inputfelt i fokus</label>

        <input class="form-input  focus" placeholder="" id="input-focus" value="" name="input-focus"
            type="text">
    </div>

    <div class="form-group input-error">
        <label class="form-label icon-link " for="input-error">Inputfelt med fejl</label>
        <span class="form-hint" id="input-hint-message-input-error">Fx 12345678</span>
        <span class="input-error-message" id="input-error-message-input-error" role="alert">Hjælpsom fejlbesked</span>
        <input class="form-input  " placeholder="" id="input-error" value="" name="input-error"
            type="text" aria-describedby="input-error-message-input-error" aria-describedby="input-hint-message-input-error">
    </div>

    <div class="form-group input-success">
        <label class="form-label icon-link " for="input-success">Inputfelt med succes</label>

        <input class="form-input  " placeholder="" id="input-success" value="" name=""
            type="text">
    </div>

</div>