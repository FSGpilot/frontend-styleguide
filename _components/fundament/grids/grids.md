---
permalink: /components/fundament/grids/
redirect_from:
- /grids/
layout: styleguide
type: component
title: Grids
category: UI components
subcategory: Partikler - Retningslinjer
lead: Use Boostrap's powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, five default responsive tiers, Sass variables and mixins, and dozens of predefined classes.
subnav:
- text: How it works
  href: '#how-it-works'
- text: Grid options
  href: '#grid-options'
- text: Auto-layout columns
  href: '#auto-layout-columns'
- text: Responsive classes
  href: '#responsive-classes'
- text: Alignment
  href: '#alignment'
- text: Reordering
  href: '#reordering'
- text: Nesting
  href: '#nesting'
- text: Sass mixins
  href: '#sass-mixins'
- text: Customizing the grid
  href: '#customizing-the-grid'
---

<section id="section-how-it-works">
<h2 class="heading heading-margin-alt" id="how-it-works">How it works</h2>
<p>Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content. It's built with <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes">flexbox</a> and is fully responsive. Below is an example and an in-depth look at how the grid comes together.</p>

<p><strong>New to or unfamiliar with flexbox?</strong> <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background">Read this CSS Tricks flexbox guide</a> for background, terminology, guidelines, and code snippets.</p>

{% include code/preview.html component="grid--how-it-works.html" %}
{% include code/accordion.html component="grid--how-it-works" %}
</section>

<section id="section-grid-options">
<h2 class="heading heading-margin-alt" id="grid-options">Grid options</h2>
<p>While Bootstrap uses <span class="highlight">em</span>s or <span class="highlight">rem</span>s for defining most sizes, <span class="highlight">px</span>s are used for grid breakpoints and container widths. This is because the viewport width is in pixels and does not change with the <a href="https://drafts.csswg.org/mediaqueries-3/#units">font size</a>.</p>

<p>See how aspects of the Bootstrap grid system work across multiple devices with a handy table.</p>

<table class="dk-table bs-example-table">
    <thead>
        <tr>
            <th></th>
            <th>Extra small<br /><small>&lt;576px</small></th>
            <th>Small<br /><small>&ge;576px</small></th>
            <th>Medium<br /><small>&ge;768px</small></th>
            <th>Large<br /><small>&ge;992px</small></th>
            <th>Extra large<br /><small>&ge;1200px</small></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Max container width</th>
            <td>None (auto)</td>
            <td>540px</td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
        </tr>
        <tr>
            <th>Class prefix</th>
            <td><span class="highlight">.col-</span></td>
            <td><span class="highlight">.col-sm-</span></td>
            <td><span class="highlight">.col-md-</span></td>
            <td><span class="highlight">.col-lg-</span></td>
            <td><span class="highlight">.col-xl-</span></td>
        </tr>
        <tr>
            <th># of columns</th>
            <td colspan="5">12</td>
        </tr>
        <tr>
            <th>Gutter width</th>
            <td colspan="5">1rem (16px on each side of a column)</td>
        </tr>
        <tr>
            <th>Nestable</th>
            <td colspan="5">Yes</td>
        </tr>
        <tr>
            <th>Column ordring</th>
            <td colspan="5">Yes</td>
        </tr>
    </tbody>
</table>
</section>

<section id="section-auto-layout-columns">
<h2 class="heading heading-margin-alt" id="auto-layout-columns">Auto-layout columns</h2>
<p>Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered class like <span class="highlight">.col-sm-6</span>.</p>

<h3>Equal width</h3>

<p>For example, here are two grid layouts that apply to every device and viewport, from <span class="highlight">xs</span> to <span class="highlight">xl</span>. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.</p>

{% include code/preview.html component="grid--equal-width.html" %}
{% include code/accordion.html component="grid--equal-width" %}

<h3>Setting one column width</h3>

<p>Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.</p>

{% include code/preview.html component="grid--one-column-width.html" %}
{% include code/accordion.html component="grid--one-column-width" %}

<h3>Variable width content</h3>

<p>Use <span class="highlight">col-{breakpoint}-auto</span> classes to size columns based on the natural width of their content.</p>

{% include code/preview.html component="grid--variable-width-content.html" %}
{% include code/accordion.html component="grid--variable-width-content" %}
</section>

<section id="section-responsive-classes">
<h2 class="heading heading-margin-alt" id="responsive-classes">Responsive classes</h2>
<p>Bootstrap's grid includes five tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on extra small, small, medium, large, or extra large devices however you see fit.</p>

<h3>All breakpoints</h3>
<p>For grids that are the same from the smallest of devices to the largest, use the <span class="highlight">.col</span> and <span class="highlight">.col-*</span> classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to <span class="highlight">.col</span>.</p>

{% include code/preview.html component="grid--all-breakpoints.html" %}
{% include code/accordion.html component="grid--all-breakpoints" %}

<h3>Stacked to horizontal</h3>
<p>Using a single set of <span class="highlight">.col-sm-*</span> classes, you can create a basic grid system that starts out stacked on extra small devices before becoming horizontal on desktop (medium) devices.</p>

{% include code/preview.html component="grid--stacked-horizontal.html" %}
{% include code/accordion.html component="grid--stacked-horizontal" %}

<h3>Mix and match</h3>
<p>Don't want your columns to simply stack in some grid tiers? Use a combination of different classes for each tier as needed. See the example below for a better idea of how it all works.</p>

{% include code/preview.html component="grid--mix-match.html" %}
{% include code/accordion.html component="grid--mix-match" %}
</section>

<section id="section-alignment">
<h2 class="heading heading-margin-alt" id="alignment">Alignment</h2>
<p>Use flexbox alignment utilities to vertically and horizontally align columns.</p>

<h3>Vertical alignment</h3>

{% include code/preview.html component="grid--vertical-align-01.html" %}
{% include code/accordion.html component="grid--vertical-align-01" %}

{% include code/preview.html component="grid--vertical-align-02.html" %}
{% include code/accordion.html component="grid--vertical-align-02" %}

<h3>Horizontal alignment</h3>

{% include code/preview.html component="grid--horizontal-align.html" %}
{% include code/accordion.html component="grid--horizontal-align" %}

<h3>No gutters</h3>
<p>The gutters between columns in our predefined grid classes can be removed with <span class="highlight">.no-gutters</span>. This removes the negative <span class="highlight">margin</span>s from <span class="highlight">.row</span> and the horizontal <span class="highlight">padding</span> from all immediate children columns.</p>

<p>Here's the source code for creating these styles. Note that column overrides are scoped to only the first children columns and are targeted via <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors">attribute selector</a>. While this generates a more specific selector, column padding can still be further customized with spacing utilities.</p>

<p><strong>Need an edge-to-edge design?</strong> Drop the parent <span class="highlight">.container</span> or <span class="highlight">.container-fluid</span>.</p>

{% include code/accordion.html component="grid--no-gutters-sass" %}

<p>In practice, here's how it looks. Note you can continue to use this with all other predefined grid classes (including column widths, responsive tiers, reorders, and more).</p>

{% include code/preview.html component="grid--no-gutters.html" %}
{% include code/accordion.html component="grid--no-gutters" %}

<h3>Column wrapping</h3>
<p>If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.</p>

{% include code/preview.html component="grid--column-wrapping.html" %}
{% include code/accordion.html component="grid--column-wrapping" %}
</section>

<section id="section-reordering">
<h2 class="heading heading-margin-alt" id="reordering">Reordering</h2>
<h3>Order classes</h3>

<p>Use <span class="highlight">.order-</span> classes for controlling the <strong>visual order</strong> of your content. These classes are responsive, so you can set the <span class="highlight">order</span> by breakpoint (e.g., <span class="highlight">.order-1.order-md-2</span>). Includes support for <span class="highlight">1</span> through <span class="highlight">12</span> across all five grid tiers.

{% include code/preview.html component="grid--ordering-visual.html" %}
{% include code/accordion.html component="grid--ordering-visual" %}

<p>There's also a responsive <span class="highlight">.order-first</span> class that quickly changes the order of one element by applying <span class="highlight">order: -1</span>. This class can also be intermixed with the numbered <span class="highlight">.order-*</span> classes as needed.</p>

{% include code/preview.html component="grid--ordering-responsive.html" %}
{% include code/accordion.html component="grid--ordering-responsive" %}


<h3>Offsetting columns</h3>
<p>You can offset grid columns by using the responsive <span class="highlight">.offset-</span> grid classes. Grid classes are sized to match columns while margins are more useful for quick layouts where the width of the offset is variable.</p>

<h4>Offset classes</h4>
<p>Move columns to the right using <span class="highlight">.offset-md-*</span> classes. These classes increase the left margin of a column by <span class="highlight">*</span> columns. For example, <span class="highlight">.offset-md-4</span> moves <span class="highlight">.col-md-4</span> over four columns.</p>

{% include code/preview.html component="grid--offsets.html" %}
{% include code/accordion.html component="grid--offsets" %}

<p>In addition to column clearing at responsive breakpoints, you may need to reset offsets.</p>

{% include code/preview.html component="grid--offsets-reset.html" %}
{% include code/accordion.html component="grid--offsets-reset" %}

<h4>Margin utilities</h4>
<p>You can also use margin utilities like <span class="highlight">.mr-auto</span> to force sibling columns away from one another.</p>

{% include code/preview.html component="grid--offsets-margin.html" %}
{% include code/accordion.html component="grid--offsets-margin" %}

</section>

<section id="section-nesting">
<h2 class="heading heading-margin-alt" id="nesting">Nesting</h2>
<p>To nest your content with the default grid, add a new <span class="highlight">.row</span> and set of <span class="highlight">.col-sm-*</span> columns within an existing <span class="highlight">.col-sm-*</span> column. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).</p>

{% include code/preview.html component="grid--nesting.html" %}
{% include code/accordion.html component="grid--nesting" %}
</section>

<section id="section-sass-mixins">
<h2 class="heading heading-margin-alt" id="sass-mixins">Sass mixins</h2>
<p>When using Bootstrap's source Sass files, you have the option of using Sass variables and mixins to create custom, semantic, and responsive page layouts. Our predefined grid classes use these same variables and mixins to provide a whole suite of ready-to-use classes for fast responsive layouts.</p>

<h3>Variables</h3>
<p>Variables and maps determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below.</p>

<pre>
<code class="lang-scss">$grid-columns:      12;
$grid-gutter-width: 30px;

$grid-breakpoints: (
    // Extra small screen / phone
    xs: 0,
    // Small screen / phone
    sm: 576px,
    // Medium screen / tablet
    md: 768px,
    // Large screen / desktop
    lg: 992px,
    // Extra large screen / wide desktop
    xl: 1200px
);

$container-max-widths: (
    sm: 540px,
    md: 720px,
    lg: 960px,
    xl: 1140px
);</code>
</pre>

<h3>Mixins</h3>
<p>Mixins are used in conjunction with the grid variables to generate semantic CSS for individual grid columns.</p>

<pre>
<code class="lang-scss">// Creates a wrapper for a series of columns
@include make-row();

// Make the element grid-ready (applying everything but the width)
@include make-col-ready();
@include make-col($size, $columns: $grid-columns);

// Get fancy by offsetting, or changing the sort order
@include make-col-offset($size, $columns: $grid-columns);</code>
</pre>

<h3>Example usage</h3>
<p>You can modify the variables to your own custom values, or just use the mixins with their default values. Here's an example of using the default settings to create a two-column layout with a gap between.</p>

<pre>
<code class="lang-scss">.example-container {
    width: 800px;
    @include make-container();
}

.example-row {
    @include make-row();
}

.example-content-main {
    @include make-col-ready();

    @include media-breakpoint-up(sm) {
        @include make-col(6);
    }
    @include media-breakpoint-up(lg) {
        @include make-col(8);
    }
}

.example-content-secondary {
    @include make-col-ready();

    @include media-breakpoint-up(sm) {
        @include make-col(6);
    }
    @include media-breakpoint-up(lg) {
        @include make-col(4);
    }
}</code>
</pre>
</section>

<section id="section-customizing-the-grid">
<h2 class="heading heading-margin-alt" id="customizing-the-grid">Customizing the grid</h2>
<p>Using the built-in grid Sass variables and maps, it's possible to completely customize the predefined grid classes. Change the number of tiers, the media query dimensions, and the container widths - then recompile.</p>

<h3>Columns and gutters</h3>
<p>The number of grid columns can be modified via Sass variables. <span class="highlight">$grid-columns</span> is used to generate the widths (in percent) of each individual column while <span class="highlight">$grid-gutter-width</span> allows breakpoint-specific widths that are divided evenly across <span class="highlight">padding-left</span> and <span class="highlight">padding-right</span> for the column gutters.</p>

<pre>
<code class="lang-scss">$grid-columns: 12 !default;
$grid-gutter-width: 30px !default;</code>
</pre>

<h3>Grid tiers</h3>
<p>Moving beyond the columns themselves, you may also customize the number of grid tiers. If you wanted just four grid tiers, you'd update the <span class="highlight">$grid-breakpoints</span> and <span class="highlight">$container-max-widths</span></p>

<pre>
<code class="lang-scss">$grid-breakpoints: (
    xs: 0,
    sm: 480px,
    md: 768px,
    lg: 1024px
);

$container-max-widths: (
    sm: 420px,
    md: 720px,
    lg: 960px
);</code>
</pre>

<p>When making any changes to the Sass variables or maps, you'll need to save your changes and recompile. Doing so will output a brand new set of predefined grid classes for column widths, offsets, and ordering. Responsive visibility utilities will also be updated to use the custom breakpoints. Make sure to set grid values in <span class="highlight">px</span> (not <span class="highlight">rem</span>, <span class="highlight">em</span>, or <span class="highlight">%</span>).</p>
</section>

<style scoped>
    .highlight {
        padding: 3px 6px;
        background-color: #eee;
        border-radius: 4px;
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 90%;
        color: #bd4147;
    }
    pre {
        display: block;
        padding: 0;
        margin-top: 15px;
        margin-bottom: 0;
        word-break: normal;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 98%;
        color: #212529;
    }
    code {
        padding: 0;
        background-color: transparent;
        border-radius: 0;
        font-family: inherit;
        font-size: 90%;
        color: inherit;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
    }
    .hljs {
        background: #eee;
        padding: 2.4rem;
    }
</style>
