var gulp = require('gulp');
var dutil = require('./doc-util');
var runSequence = require('run-sequence').use(gulp);
var runCmd = require('gulp-run-command').default;
var task = 'html';

var remoteSrc = require('gulp-remote-src');
var rename = require("gulp-rename");
var modifyFile = require('gulp-modify-file');
var prettify = require('gulp-jsbeautifier');
var plumber = require('gulp-plumber');

var distComponentCode = '_includes/code/components';
var distComponentPreview = '_includes/code/components-preview';
var distJekyllComponentPreview = '_preview-components';

/**
 * NOTICE: For these html-function to work properly, you need to run 'npm link' in your local component-library
 * Guide: 
 * - Go to your components project and run 'npm link'.
 * - Go to your docs project and run 'npm link dkwds'
 * The docs-project now has the component-project as a dependency in its node-modues folder. The folder is a shortcut to the componeent project on your machine. 
 * 
 * Description of the following tasks:
 * - generateComponentsHtml: goes to the '/node_modules/dkwds/ folder (component project), and calls the 'npm run fb' command, this will make the component projekt generate html into its '\build\components\render' folder. 
 * - generateDocMarkdown: Now that the 'dkwds/build/components/render/'-folder has the newest html, markdown for the docs site is generated. 
 * - createMarkdown: create markdown for a single file, used by generateDocMarkdown().
 * 
 * Pretty printing docs: 
 * https://github.com/beautify-web/js-beautify#css--html
 * https://github.com/beautify-web/js-beautify/blob/master/js/lib/beautify-html.js
 */

function createMarkdown(content, path, file) {
    var fileName = path.split("\\").pop();    
    var header = `--- 
permalink: /preview-components/` + fileName + `
layout: iframed 
title: ` + fileName[0].toUpperCase() + fileName.slice(1) + `
---
`
    return header + content;
}


gulp.task('generateComponentsHtml', runCmd('npm run fb', {'cwd': './node_modules/dkwds/'}));

gulp.task('generateDocMarkdown', function (done) {
    return gulp.src('./node_modules/dkwds/build/components/render/**/*')
    .pipe(prettify({

        wrap_line_length: 75, 
        max_preserve_newlines: 1, 
        unformatted: [ /*'a',*/ 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', /*'button',*/ 'canvas', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', /*'i',*/ 'iframe', 'img',
            /*'input',*/ 'ins', 'kbd', 'keygen', /*'label',*/ 'map', 'mark', 'math', 'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */ /*'select',*/ 'small',
            /*'span',*/ 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var',
            'video', 'wbr', /*'text',*/
            // prexisting - not sure of full effect of removing, leaving in
            'acronym', /*'address',*/ 'big', 'dt', 'ins', 'strike', 'tt',
        ],
        content_unformatted:'',
        extra_liners: 'head,body,/html'
    }))
    .pipe(gulp.dest(distComponentCode))
    .pipe(modifyFile(createMarkdown))
    .pipe(rename(function(path){
        path.extname = ".md";        
    }))
    .pipe(gulp.dest(distComponentPreview))
    .pipe(gulp.dest(distJekyllComponentPreview));
});


gulp.task(task, ['generateDocMarkdown'], function (done) { 

    done();
});

