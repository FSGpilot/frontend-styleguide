var gulp        = require('gulp');
var gutil       = require('gulp-util');
var dutil       = require('./doc-util');
var browserify  = require('browserify');
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var rename      = require('gulp-rename');
var linter      = require('gulp-eslint');
var task        = 'javascript';

gulp.task('eslint', function (done) {

  if (!cFlags.test) { 
    dutil.logMessage('eslint', 'Skipping linting of JavaScript files.');
    return done();
  }

  return gulp.src([
    './js/**/*.js',
    '!./js/vendor/**/*.js'])
    .pipe(linter('.eslintrc'))
    .pipe(linter.format());

});

gulp.task('copy-dkwds-javascript', function (done) {

  // dutil.logMessage(task, 'Copying JS from dkwds');

  var stream = gulp.src('./node_modules/dkwds/dist/js/**/*')
    .pipe(gulp.dest('assets/js/vendor'));

  return stream;

});

gulp.task('copy-iframe-script', function (done) {

    var stream = gulp.src(['./node_modules/iframe-resizer/js/iframeResizer.contentWindow.min.js', './node_modules/iframe-resizer/js/iframeResizer.contentWindow.map'])
    .pipe(gulp.dest('_site/assets/js/vendor'))
    .pipe(gulp.dest('assets/js/vendor'));

    return stream;

  });

gulp.task('copy-highlightjs-script', function (done) {
    var stream = gulp.src('./node_modules/dkwds/src/vendor/*')
        .pipe(gulp.dest('assets/js/vendor'));

    return stream;
});

gulp.task(task, [ 'copy-dkwds-javascript', 'copy-iframe-script', 'copy-highlightjs-script', 'eslint' ], function (done) {

  // dutil.logMessage(task, 'Compiling JavaScript');

  var minifiedStream = browserify({
    entries: 'js/start.js',
    debug: true,
  });

  return minifiedStream.bundle()
    .pipe(source('start.js'))
    .pipe(buffer())
    .pipe(rename({
      basename: 'styleguide'
    }))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename({
      basename: 'styleguide',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(gulp.dest('assets/js'));

});
