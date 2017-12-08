---
title: Auto-layout columns
parent: Grids
order: 03
---

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered class like <code>.col-sm-6</code>.

### Equal width

For example, here are two grid layouts that apply to every device and viewport, from <code>xs</code> to <code>xl</code>. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.

{% include code/preview.html component="grid--equal-width" %}
{% include code/accordion.html component="grid--equal-width" %}

### Setting one column width

Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.

{% include code/preview.html component="grid--one-column-width" %}
{% include code/accordion.html component="grid--one-column-width" %}

### Variable width content

Use <code>col-{breakpoint}-auto</code> classes to size columns based on the natural width of their content.

{% include code/preview.html component="grid--variable-width-content" %}
{% include code/accordion.html component="grid--variable-width-content" %}


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
