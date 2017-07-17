---
permalink: /components/fundament/interaktionsdesign/
layout: styleguide
title: Interaktionsdesign
category: UI components
subcategory: Partikler - Retningslinjer
lead: Interaktionsdesign tips to help you deliver delightful experiences to all users.
order: 25
---

## Interaktionsdesign for Navigation

Navigation organizes content so that it’s easier to find important destinations in your app. Navigation may include frequently visited places, contain settings, or encourage specific actions.

To determine the type of navigation best suited to your app, identify your app’s users, typical paths they might take through your app, and actions you want them to perform.

For instance, if your app is a restaurant guide, your users may want to make reservations, post menus, or write reviews. By identifying the goals most users will have, you’ll be able to better define a navigation structure that meets their priorities.

#### Take inventory

Identify your app’s users and their potential roles, such as consumer, business owner, or journalist. Identify the most common tasks they may want to perform.
<img src="{{ site.baseurl }}/img/inventory.png">

### Prioritize

Assign priority levels of high, medium, or low to common user tasks. Give prominence in the UI to paths and destinations with high priority levels and frequent use.

Adjust priority levels as user needs change over time.
<img src="{{ site.baseurl }}/img/prioritize.png">

### Sequence

Identify the different paths that users take through your app and use those paths to define your navigation:

* List frequent destinations prominently in your navigation
* Group related tasks together and use those groupings to structure your navigation

<img src="{{ site.baseurl }}/img/sequence.png">

### Deconstruct

Divide complex, broad, or vague use cases into smaller activities. These smaller tasks may be frequently used, more easily understood, or better meet user goals.

For example, dividing search into smaller activities that differentiate searching by name, location, or popularity may reveal the need to surface those smaller activities as part of navigation.
<img src="{{ site.baseurl }}/img/deconstruct.png">

### Nested Navigation
When you have multiple levels of navigation, sibling views should be nested underneath their parent.

On desktop, a secondary level of navigation may be nested within the navigation drawer.

Appropriate for these hierarchies:
<ul class="usa-content-list">
      <li>Lateral navigation</li>
      <li>Parents with siblings or peers</li>
</ul>
Recommended for:
<ul class="usa-content-list">
      <li>Deep navigation structures with many views</li>
      <li>Enabling quick navigation between unrelated views</li>
</ul>

<img src="{{ site.baseurl }}/img/patterns_navigation_patterns_nested1.png">
