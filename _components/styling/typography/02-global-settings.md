---
type: component
title: Global settings
parent: typography
order: 02
---

<!-- Global setting begin -->
<h4 class="heading">Fonts</h4>
<p>For at skifte i mellem fonte bruges font-weight variablerne:</p>
<p class="monospace">
	$font-weight-normal<br>
	$font-weight medium<br>
	$font-weight-semibold<br>
	$font-weight-bold<br>
</p>
<p>For at ændre font-style bruges variablerne:</p>
<p class="monospace">
	$font-style-normal<br>
	$font-style-italic
</p>


<h4 class="heading">Headings</h4>
<p>Alle headings (h1-h6) er stylet med mixins, som styrer hver enkel headings font-family, font-size, line-height, font-weight og color. </p>
<p class="monospace">
	@mixin h1{ <br>
    font-family: $font-name; <br>
    font-size: $h1-font-size; <br>
    line-height: $h1-line-height; <br>
    font-weight: $font-weight-bold; <br>
    color: $color-base;
  }
</p>
<p class="monospace">
h1, .h1 {<br>
@include h1;<br>
}
</p> 
<p>Der er oprettet klasser for hver heading, som arver styling fra heading mixins. Dette betyder at hvis der ønskes en h1 med styling fra h2, skal klassen .h2 blot indsættes på <h1 class="h2"></h1> </p>





