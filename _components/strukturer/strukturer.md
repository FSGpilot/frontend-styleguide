---
permalink: /components/strukturer/
layout: styleguide
title: Strukturer (organismer)
category: UI components
subcategory: Strukturer (organismer)
lead: Organismer tips to help you deliver delightful experiences to all users.
subnav:
- text: Footer
  href: '/components/strukturer/footers/'
- text: Formularer
  href: '/components/strukturer/form-templates/'
- text: Header
  href: '/components/strukturer/headers/'
- text: Modalvinduer
  href: '/components/strukturer/modalvinduer/'
- text: Struktureret liste
  href: '/components/strukturer/liste/'
---

## Hiding and showing content

There will be cases in which you will need to selectively "show" and "hide"
content by either removing it from the visual flow or preventing screen
readers from reading it. We have settled on the following conventions for each
use case:

{% capture show %}**show**{% endcapture %}
{% capture hide %}_hide_{% endcapture %}

Visual<br>browsers | Screen<br>readers | Solution
:--- | :--- | :---
{{ hide }} | {{ hide }} | Add the boolean [`hidden` attribute][hidden] attribute to dynamically hide content from all users. [Remove the attribute][remove-attr] to show it again.
{{ show }} | {{ hide }} | Use the [`aria-hidden="true"`][aria-hidden] attribute to "hide" content from screen readers while keeping it visually perceivable.
{{ hide }} | {{ show }} | Use the `usa-sr-only` class to show content to screen readers only. This removes the content from the visual flow of the document but retains its legibility by screen readers.

[hidden]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden
[remove-attr]: https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
[aria-hidden]: https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
