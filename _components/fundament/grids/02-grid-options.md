---
title: Grid options
parent: Grids
order: 02
---

## Grid options

While Bootstrap uses <code>em</code>s or <code>rem</code>s for defining most sizes, <code>px</code>s are used for grid breakpoints and container widths. This is because the viewport width is in pixels and does not change with the [font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

<table class="dk-table bs-example-table">
    <thead>
        <tr>
            <th></th>
            <th>Extra small<br /><small>&lt;576px</small></th>
            <th>Small<br /><small>&ge;576px</small></th>
            <th>Medium<br /><small>&ge;768px</small></th>
            <th>Large<br /><small>&ge;992px</small></th>
            <th>Extra large<br /><small>&ge;1200px</small></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Max container width</th>
            <td>None (auto)</td>
            <td>540px</td>
            <td>720px</td>
            <td>960px</td>
            <td>1140px</td>
        </tr>
        <tr>
            <th>Class prefix</th>
            <td><code>.col-</code></td>
            <td><code>.col-sm-</code></td>
            <td><code>.col-md-</code></td>
            <td><code>.col-lg-</code></td>
            <td><code>.col-xl-</code></td>
        </tr>
        <tr>
            <th># of columns</th>
            <td colspan="5">12</td>
        </tr>
        <tr>
            <th>Gutter width</th>
            <td colspan="5">1rem (16px on each side of a column)</td>
        </tr>
        <tr>
            <th>Nestable</th>
            <td colspan="5">Yes</td>
        </tr>
        <tr>
            <th>Column ordring</th>
            <td colspan="5">Yes</td>
        </tr>
    </tbody>
</table>

<style scoped>
    .bs-example-table > thead > tr > th,
    .bs-example-table > tbody > tr > td {
        padding: 14px;
        vertical-align: top;
        border:  1px solid #e9ecef;
        background-color: transparent;
    }

    .bs-example-table > thead > tr > th {
        text-align: center;
    }

    .bs-example-table > tbody > tr > th {
        white-space: nowrap;
        background-color: transparent;
        border: 1px solid #e9ecef;
    }

    .bs-example-table > tbody > tr:nth-of-type(odd) {
        background-color: rgba(0,0,0,.05);
    }

    .bs-example-table > tbody > tr:hover > td  {
        background-color: transparent !important;
        border-top: 1px solid #e9ecef !important;
        border-bottom: 1px solid #e9ecef !important;
        border-right: 1px solid #e9ecef !important;
        cursor: default !important;
    }

    .bs-example-table small {
        font-size: 80%;
        font-weight: 400;
    }
    code {
        padding: 3px 6px;
        background-color: #eee;
        border-radius: 4px;
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 90%;
        color: #bd4147;
    }
</style>
