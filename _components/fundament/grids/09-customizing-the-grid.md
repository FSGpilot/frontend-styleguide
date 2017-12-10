---
title: Customizing the grid
parent: Grids
order: 09
---

Using the built-in grid Sass variables and maps, it's possible to completely customize the predefined grid classes. Change the number of tiers, the media query dimensions, and the container widths - then recompile.

### Columns and gutters

The number of grid columns can be modified via Sass variables. <code>$grid-columns</code> is used to generate the widths (in percent) of each individual column while <code>$grid-gutter-width</code> allows breakpoint-specific widths that are divided evenly across <code>padding-left</code> and <code>padding-right</code> for the column gutters.

{% include code/preview.html component="grid--custom-cols-gutters" %}
{% include code/accordion.html component="grid--custom-cols-gutters" %}

### Grid tiers

Moving beyond the columns themselves, you may also customize the number of grid tiers. If you wanted just four grid tiers, you’d update the <code>$grid-breakpoints</code> and <code>$container-max-widths</code> to something like this:

{% include code/preview.html component="grid--custom-grid-tiers" %}
{% include code/accordion.html component="grid--custom-grid-tiers" %}

When making any changes to the Sass variables or maps, you’ll need to save your changes and recompile. Doing so will output a brand new set of predefined grid classes for column widths, offsets, and ordering. Responsive visibility utilities will also be updated to use the custom breakpoints. Make sure to set grid values in <code>px</code> (not <code>rem</code>, <code>em</code>, or <code>%</code>).
