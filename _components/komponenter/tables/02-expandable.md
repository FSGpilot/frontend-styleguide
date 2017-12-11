---
title: Expandable table
parent: Tables
order: 02
lead: Expandable table allows user to hide and show content of a row. 
---

{% include code/preview.html component="expandable" %}
{% include code/accordion.html component="expandable" %}


<div class="accordion-bordered accordion-docs">
    <button class="button-unstyled accordion-button" aria-expanded="true" aria-controls="expandable-docs">Documentation</button>
    <div id="expandable-docs" aria-hidden="false" class="accordion-content">
        <h4>SCSS classes</h4>
        <p>In order to use expandable table it is needed to mark expandable rows by scss classes. All necessary classes are listed in the table below.</p>        
        <div class="table-container">
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCCS class</th>
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
                        <td>A row that is expanded after button click. It corresponds to button in previous row. </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>