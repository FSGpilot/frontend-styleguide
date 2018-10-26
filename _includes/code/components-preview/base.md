--- 
permalink: /preview-components/base.html
layout: iframed 
title: Base.html
---
<!DOCTYPE html>
<html lang="en-US" dir="ltr" class="no-js">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script>
        window.frctl = {
            env: 'static'
        };
    </script>
    <script>
        var cl = document.querySelector('html').classList;
        cl.remove('no-js');
        cl.add('has-js');
    </script>
    <link rel="shortcut icon" href="../../themes/mandelbrot/favicon.ico" type="image/ico">

    <link rel="stylesheet" href="../../themes/mandelbrot/css/white.css?cachebust=1.2.0"
        type="text/css">

    <title>Error rendering component base | Frontend Styleguide</title>

</head>

<body>

    <div class="Frame Frame--full" id="frame">

        <div class="Error Error--render">
            <h4 class="Error-title">Error rendering component</h4>
            <div class="Error-message Prose">
                <p>(unknown path) Error: Could not render component &#39;@footer&#39;
                    - component not found.</p>

            </div>

            <code class="Error-stack">
        <pre>Template render error: (unknown path)
  Error: Could not render component '@footer' - component not found.
    at Object.exports.prettifyError (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\lib.js:34:15)
    at C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:486:31
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:41:12)
    at b_footer (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:129:3)
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:40:85)
    at b_body (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:111:1)
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:36:83)
    at b_header (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:99:1)
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:32:85)
    at b_banner (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:88:1)
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:28:85)
    at b_skipnav (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:77:1)
    at eval (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:24:86)
    at b_styles (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:65:1)
    at new_cls.root [as rootRenderFunc] (eval at _compile (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:565:24), <anonymous>:20:85)
    at new_cls.render (C:\Projects\FaellesoffentligStyleguide\Code\fsgpilot\dk-web-design-standards-components\node_modules\nunjucks\src\environment.js:479:15)</pre>
    </code>

        </div>

    </div>

    <script src="../../themes/mandelbrot/js/mandelbrot.js?cachebust=1.2.0"></script>

</body>

</html>