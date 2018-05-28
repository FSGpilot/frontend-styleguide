---
type: component
title: Global settings
parent: typography
order: 05
---

<!-- Global setting begin -->
<h4 class="h4">Fonts</h4>
<p>For at skifte i mellem fonte bruges font-weight variablerne:</p>
<div class="code-highlight">
	<code>
		$font-weight-normal<br>
		$font-weight medium<br>
		$font-weight-semibold<br>
		$font-weight-bold<br>
	</code>
</div>

<p>For at ændre font-style bruges variablerne:</p>
<div class="code-highlight">
	<code>
		$font-style-normal<br>
		$font-style-italic
	</code>
</div>


<h4 class="h4">Headings</h4>
<p>Alle headings (h1-h6) er stylet med mixins, som styrer hver enkel headings font-family, font-size, line-height, font-weight og color. </p>
<div class="code-highlight">
	<code>
		@mixin h1{ <br>
		&nbsp;&nbsp;&nbsp;font-family: $font-name; <br>
		&nbsp;&nbsp;&nbsp;font-size: $h1-font-size; <br>
		&nbsp;&nbsp;&nbsp;line-height: $h1-line-height; <br>
		&nbsp;&nbsp;&nbsp;font-weight: $font-weight-bold; <br>
		&nbsp;&nbsp;&nbsp;color: $color-black;<br>
	}
	</code>
</div>
<div class="code-highlight">
	<code>
		h1, .h1 {<br>
		&nbsp;&nbsp;&nbsp;@include h1;<br>
		}
	</code>
</div>
<p>Der er oprettet klasser for hver heading, som arver styling fra heading mixins. Dette betyder at hvis der ønskes en h1 med styling fra h2, skal klassen .h2 blot indsættes på &lt;h1 class="h2"&gt;</p>
