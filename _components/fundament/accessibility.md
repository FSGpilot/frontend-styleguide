---
permalink: /components/fundament/accessibility/
layout: styleguide
title: Tilgængelighed
category: UI components
subcategory: Partikler - Retningslinjer
lead: Accessibility tips to help you deliver delightful experiences to all users.
order: 25
---

## Principles

A well-designed product is accessible to users of all abilities, including those with low vision, blindness, hearing impairments, cognitive impairments, or motor impairments. Improving your product’s accessibility enhances the usability for all users. It’s also the right thing to do.

Material design’s built-in accessibility considerations will help you accommodate all of your users. This section primarily applies to mobile UI design. For more information on designing and developing fully accessible products, visit the Google accessibility site.

## Color and contrast

Use color and contrast to help users see and interpret your app’s content, interact with the right elements, and understand actions.

### Contrast ratios

The contrast ratio between a color and its background ranges from 1-21 based on its luminance, or intensity of light emitted, according to the World Wide Web Consortium (W3C).

Contrast ratios represent how different a color is from another color, commonly written as 1:1 or 21:1. The higher the difference between the two numbers in the ratio, the greater the difference in relative luminance between the colors.

The W3C recommends the following contrast ratios for body text and image text:

* Small text should have a contrast ratio of at least 4.5:1 against its background.
* Large text (at 14 pt bold/18 pt regular and up) should have a contrast ratio of at least 3:1 against its background.

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame">
                    <img src="{{ site.baseurl }}/img/accessibility_color1_do.png" aria-describedby="color-contrast-figure-caption-1" alt="Correct color contrast" >
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-1">
                <p class="s-tag-caption do">Do.</p>
                <p>These lines of text follow the color contrast ratio recommendations and are legible against their background colors. </p>
            </figcaption>
        </figure>
    </div>
  </div>
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame ">
                    <img alt="Incorrect color contrast" aria-describedby="color-contrast-figure-caption-2" src="{{ site.baseurl }}/img/accessibility_color2_dont.png">
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-2">
                <p class="s-tag-caption dont">Don't.</p>
                <p>These lines of text do not meet the color contrast ratio recommendations and are difficult to read against their background colors. </p>
            </figcaption>
        </figure>
    </div>
  </div>
</div>

## Hierarchy and focus

Apps should give users feedback and a sense of where they are in the app. Navigation controls should be easy to locate and clearly written. Visual feedback (such as labels, colors, and icons) and touch feedback show users what is available in the UI.

Navigation should have clear task flows with minimal steps. Focus control, or the ability to control keyboard and reading focus, should be implemented for frequently used tasks.

### Screen readers

Screen readers give users multiple ways to navigate a screen, including:

* Touch interface screen readers allow users to run their finger over the screen to hear what is directly underneath. This provides the user a quick sense of an entire interface. Or the user can quickly move to a UI element from muscle memory. In TalkBack, this feature is called “explore by touch.” To select an item, the user must double tap.
* Users may also move focus by swiping backwards or forwards on screen to read pages linearly, from top to bottom. This allows users to hone in on certain elements. In TalkBack, this is called linear navigation.

Users may switch between both “explore by touch” and “linear navigation” modes. Some assistive technologies allow users to navigate between page landmarks, such as headings, when these landmarks use the appropriate semantic markup.

Hardware or software directional controllers (such as a D-pad, trackball, or keyboard) allow users to jump from selection to selection in a linear fashion.

### Hierarchy

Place items on the screen according to their relative level of importance.

* Important actions: Place important actions at the top or bottom of the screen (reachable with shortcuts).
* Related items: Place related items of a similar hierarchy next to each other.

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame">
                    <img src="{{ site.baseurl }}/img/accessibility_hierarchy_1_do.png" aria-describedby="color-contrast-figure-caption-1" alt="Correct color contrast" >
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-1">
                <p class="s-tag-caption do">Do.</p>
                <p>By placing important actions at the top of the screen, they are given more importance in the hierarchy.</p>
            </figcaption>
        </figure>
    </div>
  </div>
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame ">
                    <img alt="Incorrect color contrast" aria-describedby="color-contrast-figure-caption-2" src="{{ site.baseurl }}/img/accessibility_hierarchy_2_dont.png">
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-2">
                <p class="s-tag-caption dont">Don't.</p>
                <p>When important actions are embedded within other content, it’s unclear what the most important elements are on the page.</p>
            </figcaption>
        </figure>
    </div>
  </div>
</div>

### Focus order

Input focus should follow the order of the visual layout, from the top to the bottom of the screen. It should traverse from the most important to the least important item. Determine the following focus points and movements:

* The order in which elements receive focus
* The way in which elements are grouped
* Where focus moves when the element in focus disappears

Clarify where the focus exists through a combination of visual indicators and accessibility text.

Group similar items under headings that communicate what the groupings are. These groups organize content spatially.

Focus traversal between screens and tasks should be as continuous as possible.

If a task is interrupted and then resumed, place focus on the element that was previously focused.

<img src="{{ site.baseurl }}/img/accessibility_hierarchy_3.png">

## Writing

Clear and helpful accessibility text is one of the primary ways to make UIs more accessible. Users with limited or no eyesight benefit from explicit verbal descriptions. Accessibility text refers to text that is used by screen reader accessibility software, such as TalkBack on Android, VoiceOver on iOS, and JAWS on desktop. Screen readers read all text on screen aloud, including both visible and nonvisible alternative text.

Accessibility text includes both visible text (including labels for UI elements, text on buttons, links, and forms) and nonvisible descriptions that don’t appear onscreen (such as alternative text for buttons without text labels). Sometimes, an onscreen label may be overridden with accessibility text to provide more information for the user.

Both visible and nonvisible text should be helpfully descriptive and independently meaningful, as some users navigate by using all the headings or links on a page. Test your app with a screen reader to identify areas that are missing or need better accessibility text.

### Be succinct

Keep content and accessibility text short and to the point. Screen reader users hear every UI element read aloud. The shorter the text, the faster the screen reader users can navigate it.

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="text-box"><p>Switch to heyfromjonathan@gmail.com</p></div><p class="s-tag-caption do">Do.</p><figcaption><p>Write clear and short accessibility text. </p></figcaption>
        </figure>
    </div>
  </div>
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="text-box"><p>Account switcher. Switch to account heyfromjonathan@gmail.com</p></div><p class="s-tag-caption dont">Don't.</p><figcaption><p>Don’t write long accessibility text. </p></figcaption>
        </figure>
    </div>
  </div>
</div>

### Avoid including control type or state in text

Screen readers may automatically announce a control’s type or state through a sound or by speaking the control name before or after the accessibility text.

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="figure">
        <div class="text-box"><p>Search</p></div><p class="s-tag-caption do">Do.</p><figcaption><p>Use short descriptions.</p></figcaption>
    </div>
  </div>
  <div class="usa-width-one-half">
    <div class="figure">
        <div class="text-box"><p>Search field</p></div><p class="s-tag-caption dont">Don't.</p><figcaption><p>Don’t write the control type.</p></figcaption>
    </div>
  </div>
</div>

### Indicate what an element does

Use action verbs to indicate what an element or link does, not what an element looks like, so a visually impaired person can understand. Link text should:

* Specify the task that tapping the link will perform
* Avoid vague descriptions, such as “click here”

Ensure an element has the same description everywhere it’s used.

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame">
                    <img src="{{ site.baseurl }}/img/accessibility_writing_edit_do.png" aria-describedby="color-contrast-figure-caption-1" alt="Correct color contrast" >
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-1">
                <p class="s-tag-caption do">Do.</p>
                <p>The description read aloud indicates the action represented by the icon.</p>
            </figcaption>
        </figure>
    </div>
  </div>
  <div class="usa-width-one-half">
    <div class="figure">
        <figure class="s-tag-media">
            <div class="media" style="max-width: 720px">
                <div class="frame ">
                    <img alt="Incorrect color contrast" aria-describedby="color-contrast-figure-caption-2" src="{{ site.baseurl }}/img/accessibility_writing_edit_dont.png">
                </div>
            </div>
            <figcaption id="color-contrast-figure-caption-2">
                <p class="s-tag-caption dont">Don't.</p>
                <p>Describing what the icon looks like doesn’t make it clear what the action does.</p>
            </figcaption>
        </figure>
    </div>
  </div>
</div>

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
