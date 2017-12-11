---
title: How it works
parent: Grids
order: 01
---

Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) and is fully responsive. Below is an example and an in-depth look at how the grid comes together.

**New to or unfamiliar with flexbox?** [Read this CSS Tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background) for background, terminology, guidelines, and code snippets.

{% include code/preview.html component="grid--how-it-works.html" %}
{% include code/accordion.html component="grid--how-it-works" %}

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
    .grid-example > .row > .col,
    .grid-example .row > [class^=col-] {
        padding-top: .75rem;
        padding-bottom: .75rem;
        background-color: rgba(86,61,124,.15);
        border: 1px solid rgba(86,61,124,.2);
    }
    code {
        padding: 3px 6px;
        background-color: #eee;
        border-radius: 4px;
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 90%;
        color: #bd4147;
    }
</style>
