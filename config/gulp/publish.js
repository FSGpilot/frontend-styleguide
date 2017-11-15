/**
 * USWD uses Federalist for publishing their documentation site. We use the /docs folder on the master-branch.
 * Note: we can't use the 'gh-pages' branch as the jykyll instance on gh-pages will attempt to compile the source-files without running gulp. This will result in build-errors.
 */
var gulp = require('gulp');
var dutil = require('./doc-util');
var count = require('gulp-count');
var task = 'publish';

var sourceFolder = '_site'; //the folder that your local jekyll-instance deploys the site to
var distFolder = 'docs'; //the folder that github pages will deploy from when pushed to master.

gulp.task(task, function () {
    dutil.logMessage(task, 'Copying compiled site from '+sourceFolder+' to '+distFolder);         
    return gulp.src(sourceFolder+'/**/*', {base:sourceFolder, cwd:'.'})
    .pipe(gulp.dest(distFolder))
    .pipe(count('Copied ## objects'));
    dutil.logMessage(task, 'Copying complete. Now push the docs folder to the master branch to deploy the site on github-pages');    
});