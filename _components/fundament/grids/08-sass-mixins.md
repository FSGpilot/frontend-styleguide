---
title: Sass mixins
parent: Grids
order: 08
---

When using Bootstrap's source Sass files, you have the option of using Sass variables and mixins to create custom, semantic, and responsive page layouts. Our predefined grid classes use these same variables and mixins to provide a whole suite of ready-to-use classes for fast responsive layouts.

### Variables

Variables and maps determine the number of columns, the gutter width, and the media query point at which to begin floating columns. We use these to generate the predefined grid classes documented above, as well as for the custom mixins listed below.

{% include code/preview.html component="grid--sass-variables" %}
{% include code/accordion.html component="grid--sass-variables" %}

### Mixins

Mixins are used in conjunction with the grid variables to generate semantic CSS for individual grid columns.

{% include code/preview.html component="grid--sass-mixins" %}
{% include code/accordion.html component="grid--sass-mixins" %}

### Example usage

You can modify the variables to your own custom values, or just use the mixins with their default values. Here’s an example of using the default settings to create a two-column layout with a gap between.

{% include code/preview.html component="grid--sass-example" %}
{% include code/accordion.html component="grid--sass-example" %}
