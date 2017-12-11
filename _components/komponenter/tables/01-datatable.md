---
title: Datatable
parent: Tables
order: 01
lead: Datatable presents the data and enables user to sort it by clicking the headers or filter it by typing a text in 'Search compute'. Each row has a menu to perform some actions. Rows selected by checking the checkbox can be modified all together. The user can change rows width in datatable settings. 
---

{% include code/preview.html component="datatable" %}
{% include code/accordion.html component="datatable" %}

<div class="accordion-bordered accordion-docs">
    <button class="button-unstyled accordion-button" aria-expanded="true" aria-controls="datatable-docs">Documentation</button>
    <div id="datatable-docs" aria-hidden="false" class="accordion-content">
        <h4>SCSS classes</h4>
        <p>Each part of the datatable has a scss class which defines its style and behaviour. All necessary classes are listed in the tables below.</p>        
        <p>Overflow menu is used in settings button and each row expandable menu. It is a seperate component. Documentation how to use it in the <a href="todo">overflow menu section.</a></p>
        <div class="table-container">
            <h5>General table structure</h5>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCCS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>table-container</td>
                        <td>A class for the main division. The table and all its parts should be inside table-cointainer.</td>
                    </tr>
                    <tr>
                        <td>dt-menu</td>
                        <td>The menu above the table. All components such as search input, buttons and selection buttons are parts of the menu.</td>
                    </tr>
                    <tr>
                        <td>dk-table</td>
                        <td>Class for the table.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-container">
            <h5>Table menu</h5>
            <span>Classes to use the menu - part above the table with buttons, search input etc.</span>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCCS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>selected-rows-menu</td>
                        <td>The menu displayed when any row is selected.</td>
                    </tr>
                    <tr>
                        <td>menu-selection-button</td>
                        <td>A button on the menu for selected rows.</td>
                    </tr>
                    <tr>
                        <td>cancel</td>
                        <td>A button to which is binded in Javascript action that unselects all rows.</td>
                    </tr>
                    <tr>
                        <td>default-menu</td>
                        <td>The menu displayed when no row is selected.</td>
                    </tr>
                    <tr>
                        <td>search-svg</td>
                        <td>Class to position and style search icon properly.</td>
                    </tr>
                    <tr>
                        <td>search</td>
                        <td>An input to which the search action is binded in Javascript.</td>
                    </tr>
                    <tr>
                        <td>menu-button</td>
                        <td>Small icon button style in default-menu.</td>
                    </tr>
                    <tr>
                        <td>primary-button</td>
                        <td>Big button style in default-menu.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-container">
            <h5>Table content</h5>
            <span>Classes for the header and rows of the table.</span>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCCS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>table-sort-button</td>
                        <td>A button placed in table header used to sort the table by values in corresponding column. A Javascript code is binded to this button class.</td>
                    </tr>
                    <tr>
                        <td>row-selection-checkbox</td>
                        <td>Checkbox to select the row. A Javascript code is binded to this class.</td>
                    </tr>                  
                </tbody>
            </table>
        </div>
    </div>
</div>