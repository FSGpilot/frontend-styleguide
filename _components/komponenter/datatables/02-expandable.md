---
title: Expandable table
parent: Tables
order: 02
lead: An expandable table allows the user to show and hide content of a row. 
---

{% include code/preview.html component="expandable" %}
{% include code/accordion.html component="expandable" %}


<div class="accordion-bordered accordion-docs">
    <button class="button-unstyled accordion-button" aria-expanded="true" aria-controls="expandable-docs">Documentation</button>
    <div id="expandable-docs" aria-hidden="false" class="accordion-content">
        <h4>SCSS classes</h4>
        <p>In order to use an expandable table it is needed to mark each of the expandable rows by scss classes. All necessary classes are listed in the table below.</p>        
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
                        <td>expand-button</td>
                        <td>A button to expand the corresponding row. Javascript code is binded to this button.</td>
                    </tr>
                    <tr>
                        <td>expandable-row</td>
                        <td>A row that is expanded after an expand-button (Button from previous class) has been clicked. </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>