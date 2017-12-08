--- 
permalink: /preview-components//home/morten/Code/Netcompany/dkwds-docs/_includes/code/components/grid--offsets.html
layout: iframed 
title: /home/morten/Code/Netcompany/dkwds-docs/_includes/code/components/grid--offsets.html
---
<div class="grid-example">
    <div class="container">
        <div class="row">
            <div class="col-sm">
                One of three columns
            </div>
            <div class="col-sm">
                One of three columns
            </div>
            <div class="col-sm">
                One of three columns
            </div>
        </div>
    </div>
</div>

<div class="grid-example">
    <div class="container">
        <div class="row">
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
        </div>
        <div class="row">
            <div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
            <div class="col-md-3 ml-md-auto">.col-md-3 .ml-md-auto</div>
        </div>
        <div class="row">
            <div class="col-auto mr-auto">.col-auto .mr-auto</div>
            <div class="col-auto">.col-auto</div>
        </div>
    </div>
</div>

<style scoped>
    .grid-example {
        position: relative;
        padding: 16px;
        margin: 16px -15px;
        border: 3px 0 0 solid #f7f7f9;
    }

    @media (min-width: 576px) {
        .grid-example {
            padding: 24px;
            margin: 16px 0 0 0;
        }
    }
</style>