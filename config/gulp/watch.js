var gulp = require('gulp');


var config = {
    baseNodemodulesPath: "./node_modules/dkwds/src",
    componentsHtml: "./node_modules/dkwds/src/components/**/*.*",
    docStyles: "./css/**/*",
    componentStyles: ["./node_modules/dkwds/src/stylesheets/**/*.scss", "!./node_modules/dkwds/src/stylesheets/lib/**/*.scss"],  
    componentJavascript: "./node_modules/dkwds/dist/js/**/*"
}

// Watching for changes
gulp.task('watch', function () {
    gulp.watch(config.componentsHtml,['html']);
    gulp.watch(config.docStyles,['copy-doc-styles']);
    gulp.watch(config.componentStyles,['copy-dkwds-styles']);
    gulp.watch(config.componentJavascript,['javascript']);
    //maybe add more watchs (images, fonts etc)
});