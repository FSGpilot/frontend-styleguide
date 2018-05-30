---
title: Table styles
parent: Tables
order: 06
lead: Tables can be styled in several ways. Some of the styles that are possibe is to add or remove borders and zebra stripes. The height of the rows can be customized as well.
---
<!-->
<div class="accordion-bordered accordion-docs">
    <button class="button-unstyled accordion-button" aria-expanded="true" aria-controls="styles-docs">Documentation</button>
    <div id="styles-docs" aria-hidden="false" class="accordion-content">
        <h4>SCSS classes</h4>
        <p>To style a table simply add one or more of the below classes in the table-element.</p>        
        <div class="table-container">
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCSS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>bordered</td>
                        <td>Table with borders. Do not use simultaneously with borderless.</td>
                    </tr>
                    <tr>
                        <td>borderless</td>
                        <td>Table without borders. Do not use simultaneously with bordered.</td>
                    </tr>
                    <tr>
                        <td>zebra</td>
                        <td>Adds zebra stripes to the table. Do not use in an expandable table.</td>
                    </tr>
                    <tr>
                        <td>compact</td>
                        <td>Sets height of the rows to 24px.</td>
                    </tr>
                    <tr>
                        <td>short</td>
                        <td>Sets height of the rows to 32px.</td>
                    </tr>
                    <tr>
                        <td>default / no value</td>
                        <td>Sets height of the rows to 48px.</td>
                    </tr>
                    <tr>
                        <td>tall</td>
                        <td>Sets height of the rows to 64px.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<h4>Bordered table</h4>
{% include code/preview.html component="bordered" %}
{% include code/accordion.html component="bordered" %}

<h4>Bordered zebra table</h4>
{% include code/preview.html component="bordered-zebra" %}
{% include code/accordion.html component="bordered-zebra" %}

<h4>Borderless table</h4>
{% include code/preview.html component="borderless" %}
{% include code/accordion.html component="borderless" %}

<h4>Borderless zebra table</h4>
{% include code/preview.html component="borderless-zebra" %}
{% include code/accordion.html component="borderless-zebra" %}

-->