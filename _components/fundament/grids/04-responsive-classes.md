---
title: Responsive classes
parent: Grids
order: 04
---

Bootstrap's grid includes five tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on extra small, small, medium, large, or extra large devices however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the <code>.col</code> and <code>.col-\*</code> classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to <code>.col</code>.

{% include code/preview.html component="grid--all-breakpoints" %}
{% include code/accordion.html component="grid--all-breakpoints" %}

### Stacked to horizontal

Using a single set of <code>.col-sm-\*</code> classes, you can create a basic grid system that starts out stacked on extra small devices before becoming horizontal on desktop (medium) devices.

{% include code/preview.html component="grid--stacked-horizontal" %}
{% include code/accordion.html component="grid--stacked-horizontal" %}

### Mix and match

Don't want your columns to simply stack in some grid tiers? Use a combination of different classes for each tier as needed. See the example below for a better idea of how it all works.

{% include code/preview.html component="grid--mix-match" %}
{% include code/accordion.html component="grid--mix-match" %}

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
