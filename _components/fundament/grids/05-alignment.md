---
title: Alignment
parent: Grids
order: 05
---

Use flexbox alignment utilities to vertically and horizontally align columns.

### Vertical alignment

{% include code/preview.html component="grid--vertical-align-01" %}
{% include code/accordion.html component="grid--vertical-align-01" %}

{% include code/preview.html component="grid--vertical-align-02" %}
{% include code/accordion.html component="grid--vertical-align-02" %}

### Horizontal alignment

{% include code/preview.html component="grid--horizontal-align" %}
{% include code/accordion.html component="grid--horizontal-align" %}

### No gutters

The gutters between columns in our predefined grid classes can be removed with <code>.no-gutters</code>. This removes the negative <code>margin</code>s from <code>.row</code> and the horizontal <code>padding</code> from all immediate children columns.

Here's the source code for creating these styles. Note that column overrides are scoped to only the first children columns and are targeted via [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors). While this generates a more specific selector, column padding can still be further customized with spacing utilities.

**Need an edge-to-edge design?** Drop the parent <code>.container</code> or <code>.container-fluid</code>.

{% include code/accordion.html component="grid--no-gutters-sass" %}

In practice, here’s how it looks. Note you can continue to use this with all other predefined grid classes (including column widths, responsive tiers, reorders, and more).

{% include code/preview.html component="grid--no-gutters" %}
{% include code/accordion.html component="grid--no-gutters" %}

### Column wrapping

If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.

{% include code/preview.html component="grid--column-wrapping" %}
{% include code/accordion.html component="grid--column-wrapping" %}

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
    .v-align .row {
        min-height: 100px;
        background-color: rgba(255,0,0,.1);
    }
</style>
