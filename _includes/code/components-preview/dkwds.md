--- 
permalink: /preview-components//home/morten/Code/Netcompany/dkwds-docs/_includes/code/components/dkwds.html
layout: iframed 
title: /home/morten/Code/Netcompany/dkwds-docs/_includes/code/components/dkwds.html
---
<!doctype html>

<html lang="en-US">

<head>
    <title>Dkwds: Default</title>
    <link rel="stylesheet" href="../../dist/css/dkwds-virkdk.min.css">
</head>

<body>

    <script src="../../dist/js/dkwds.js"></script>
    <script>
        window.addEventListener('load', function() {
            document.body.addEventListener('submit', function(e) {
                // https://github.com/18F/web-design-standards/issues/2101
                e.preventDefault();
            }, true);
        }, false);
    </script>
</body>

</html>