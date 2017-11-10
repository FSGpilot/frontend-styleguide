var gulp = require('gulp');
var dutil = require('./doc-util');
var task = 'html';

var remoteSrc = require('gulp-remote-src');
var rename = require("gulp-rename");
var modifyFile = require('gulp-modify-file');
var plumber = require('gulp-plumber');

var suffix = '/components/render/';
var envVariable = process.env.FRACTAL_BASE_URL;
var localUrl = envVariable + suffix; 
var onlineUrl = 'https://jonasjensen77.github.io/frontend-styleguide-components/' + suffix;

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

function FetchAndCreateMarkdowns(url, errorCallback) {
    var success = true;
    remoteSrc(pages, { 
        base : url,
		followAllRedirects:true
    })
    .on('error', function(obj, callback) {
        if (success) {
            errorCallback();   
            success = false;            
        }
    })
    .pipe(modifyFile(createMarkdown))
    .pipe(rename(function(path){
        path.extname = ".md";        
    }))
    .pipe(gulp.dest('_preview-components'));
}

function FetchLocal() {
    dutil.logMessage(task, 'Fetching from: ' + localUrl); 
    FetchAndCreateMarkdowns(localUrl, function() {
        dutil.logError(task, 'Failed fetching from: ' + localUrl);  
        FetchOnline();       
    });
}

function FetchOnline() {
    dutil.logMessage(task, 'Fetching from: ' + onlineUrl);  
    FetchAndCreateMarkdowns(onlineUrl, function() {
        dutil.logError(task, 'Failed fetching from: ' + localUrl);  
    });     
}

gulp.task(task, function (done) {
    if (envVariable == null) {
        dutil.logMessage(task, 'Environment variable FRACTAL_BASE_URL not found.');         
        FetchOnline();
    } else {
        dutil.logMessage(task, 'Environment variable FRACTAL_BASE_URL found: ' + envVariable);                 
        FetchLocal();
    }
    done();
});