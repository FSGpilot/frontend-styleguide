---
permalink: /designandcode/accessibility/
layout: styleguide
title: Tilgængelighed
category: UI components
subcategory: Design og kode
lead: 
order: 25
---

<h2>Tilgængelighedsattributter</h2>
<p>Nedenfor vises hvordan du gør dine elementer tilgængelige for skærmlæsere.</p>
<ul>
  <li><code>aria-hidden="true"</code> og <code>aria-hidden="false"</code> bruges til at skjule og vise elementer for skærmlæsere.</li>
  <li><code>.sr-only</code> klassen og mixin <code>@mixin sr-only()</code> bruges når elementer kun skal vises for skærmlæsere.</li>
  <li><code>aria-expanded="true"</code> og <code>aria-expanded="false"</code> bruges til elementer som toggler mellem at være åbne og lukket.</li>
  <li><code>aria-label=""</code> skal beskrive hvad funktionen af et element gør.</li>
</ul> 
