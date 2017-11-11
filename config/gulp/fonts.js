var gulp  = require('gulp');
var dutil = require('./doc-util');
var task  = 'fonts';

gulp.task(task, function (done) {

  dutil.logMessage(task, 'Copying fonts from dkwds');

  var stream = gulp.src('./node_modules/dkwds/src/fonts/**/*')
    .pipe(gulp.dest('assets/fonts'));

  return stream;

});
