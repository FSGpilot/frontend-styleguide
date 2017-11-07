var download = require("gulp-download");
var edit = require('gulp-edit');
var remoteSrc = require('gulp-remote-src');
var all = require('gulp-all')
var rename = require("gulp-rename");
var modifyFile = require('gulp-modify-file');


var gulp = require('gulp');
var dutil = require('./doc-util');
var task = 'html';

var pages = ['accordion--bordered',
'accordion--default',
'accordion--multiselectable',
'accordion',
'address-form',
'alerts--default',
'alerts--error',
'alerts--info',
'alerts--no-header',
'alerts--paragraph',
'alerts--slim',
'alerts--warning',
'alerts',
'banner',
'base',
'buttons--aqua',
'buttons--big',
'buttons--default',
'buttons--gray',
'buttons--primary',
'buttons--red',
'buttons--secondary-inverse',
'buttons--secondary',
'buttons',
'checkboxes',
'date-input',
'dkwds-content',
'dkwds-framed',
'dkwds-header',
'dkwds',
'dropdown',
'embed-container',
'fonts',
'footer--big',
'footer--default',
'footer--slim',
'footer',
'graphic-list',
'grid--default',
'grid--offsets',
'grid',
'header--basic-mega',
'header--basic',
'header--default',
'header--extended-mega',
'header--extended',
'header',
'hero',
'icons',
'kitchen-sink',
'labels--big',
'labels--default',
'labels',
'layout--docs',
'layout--landing',
'links',
'lists',
'multi-column-checkboxes',
'name-form',
'nav-primary',
'nav-secondary',
'password-reset-form',
'radio-buttons',
'search--default',
'search--header',
'search',
'sidenav--compare',
'sidenav--default',
'sidenav',
'sign-in-form',
'site-title',
'tables',
'text-input',
'tringuide',
'typesetting'];

function createMarkdown(content, path, file) {
    var fileName = path.split("\\").pop();    
    var header = `--- 
permalink: /preview-components/` + fileName + `
layout: base 
title: ` + fileName[0].toUpperCase() + fileName.slice(1) + `
---`
    return header + content;
}

gulp.task(task, function (done) {
    var url =  process.env.FRACTAL_BASE_URL + '/components/render/';
    dutil.logMessage(task, 'Creating mardown files from url: ' + url);
    remoteSrc(pages, { 
        base : url,
		followAllRedirects:true
    })
    .on('error',dutil.logError)
    .pipe(modifyFile(createMarkdown))
    .pipe(rename(function(path){
        path.extname = ".md";
    }))
    .pipe(gulp.dest('_preview-components'));
    done;
});