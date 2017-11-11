var gulp  = require('gulp');
var dutil = require('./doc-util');
var task  = 'images';

gulp.task('copy-doc-images', function (done) {

  dutil.logMessage(task, 'Copying images from img/');

  var stream = gulp.src('./img/**/*')
    .pipe(gulp.dest('assets/img'));

  return stream;

});

gulp.task('copy-dkwds-images', function (done) {

  dutil.logMessage(task, 'Copying images from dkwds');

  var stream = gulp.src('./node_modules/dkwds/src/img/**/*')
    .pipe(gulp.dest('assets/img'));

  return stream;

});

gulp.task(task, [ 'copy-doc-images', 'copy-dkwds-images' ], function (done) {

  dutil.logMessage(task, 'Copying images Sass');

});
