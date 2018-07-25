---
title: Reordering
parent: Grids
order: 06
---

### Order classes

Use <code>.order-</code> classes for controlling the **visual order** of your content. These classes are responsive, so you can set the <code>order</code> by breakpoint (e.g., <code>.order-1.order-md-2</code>). Includes support for <code>1</code> through <code>12</code> across all five grid tiers.

{% include code/preview.html component="grid--ordering-visual.html" %}
{% include code/accordion.html component="grid--ordering-visual" %}

There’s also a responsive <code>.order-first</code> class that quickly changes the order of one element by applying <code>order: -1</code>. This class can also be intermixed with the numbered <code>.order-\*</code> classes as needed.

{% include code/preview.html component="grid--ordering-responsive.html" %}
{% include code/accordion.html component="grid--ordering-responsive" %}


### Offsetting columns

You can offset grid columns by using the responsive <code>.offset-</code> grid classes. Grid classes are sized to match columns while margins are more useful for quick layouts where the width of the offset is variable.

#### Offset classes

Move columns to the right using <code>.offset-md-\*</code> classes. These classes increase the left margin of a column by <code>\*</code> columns. For example, <code>.offset-md-4</code> moves <code>.col-md-4</code> over four columns.

{% include code/preview.html component="grid--offsets.html" %}
{% include code/accordion.html component="grid--offsets" %}

In addition to column clearing at responsive breakpoints, you may need to reset offsets.

{% include code/preview.html component="grid--offsets-reset.html" %}
{% include code/accordion.html component="grid--offsets-reset" %}

#### Margin utilities

You can also use margin utilities like <code>.mr-auto</code> to force sibling columns away from one another.

{% include code/preview.html component="grid--offsets-margin.html" %}
{% include code/accordion.html component="grid--offsets-margin" %}

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
