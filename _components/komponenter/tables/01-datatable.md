---
title: Datatables
parent: Tables
order: 01
lead: A datatable is an arrangement of data in rows and columns that make comparing information easier. The following datatables enables the user to sort the data by clicking on the different headers or filter it by typing a text in the 'Search compute' field. Each row has a menu to the right, that enables performing some actions on it. Rows selected by checking the checkbox can be modified all together. The user can change rows width in the datatable settings. 
---

{% include code/preview.html component="datatable" %}
{% include code/accordion.html component="datatable" %}

<div class="accordion-bordered accordion-docs">
    <button class="button-unstyled accordion-button" aria-expanded="true" aria-controls="datatable-docs">Documentation</button>
    <div id="datatable-docs" aria-hidden="false" class="accordion-content">
        <h4>SCSS classes</h4>
        <p>Each part of the datatable has a scss-class which defines its style and behaviour. All necessary classes are listed in the tables below.</p>        
        <!--To be added later when more information has been provided>
        <p>The overflow menu can selected from the settings button and each row expandable menu. It is a seperate component. Documentation how to use it in the <a href="todo">overflow menu section.</a></p>
        <-->
        <div class="table-container">
            <h5>General table structure</h5>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCSS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>table-container</td>
                        <td>A class for the main division. The table and all its parts should be inside table-cointainer.</td>
                    </tr>
                    <tr>
                        <td>menu</td>
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
            <span>Classes to be used om the top menu of table containing buttons, search input field, etc.</span>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCSS class</th>
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
                        <td>A button that to be shown when a row is selected</td>
                    </tr>
                    <tr>
                        <td>cancel</td>
                        <td>A button which is binded in a Javascript action that unselects all rows.</td>
                    </tr>
                    <tr>
                        <td>default-menu</td>
                        <td>The menu displayed when no row is selected.</td>
                    </tr>
                    <tr>
                        <td>search-svg</td>
                        <td>Class to be used on icon to the left in the search field. Will position and style properly.</td>
                    </tr>
                    <tr>
                        <td>search</td>
                        <td>An input field to which the search action is binded in Javascript.</td>
                    </tr>
                    <tr>
                        <td>menu-button</td>
                        <td>Class for a small icon button, sitting above the header in the default-menu.</td>
                    </tr>
                    <tr>
                        <td>primary-button</td>
                        <td>Class for a big button in the default-menu.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-container">
            <h5>Table content</h5>
            <span>Classes for the table header and the rows of the table.</span>
            <table class="dk-table borderless compact" style="font-size: small">
                <thead>
                    <tr>
                        <th width="190px">SCSS class</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>table-sort-button</td>
                        <td>A button placed in the table header that is used to sort the table rows by its value. A Javascript code is binded to this button class.</td>
                    </tr>
                    <tr>
                        <td>row-selection-checkbox</td>
                        <td>A checkbox to select a row. A Javascript code is binded to this class.</td>
                    </tr>                  
                </tbody>
            </table>
        </div>
    </div>
</div>