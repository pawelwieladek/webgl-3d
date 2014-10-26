// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// Tasks
gulp.task('jshint', function() {
    // Single entry point to browserify
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Tasks
gulp.task('concat', function() {
    gulp.src(['./lib/gl-matrix.js', './src/*.js', './src/primitives/*.js'])
        .pipe(concat('webgl3d.js'))
        .pipe(gulp.dest('./dist/'));
});

// Tasks
gulp.task('watch', function() {
    watch(['./src/*.js', './src/primitives/*.js'], function (files, cb) {
        gulp.start('concat', cb);
    });
});

gulp.task('default', ['jshint', 'concat', 'watch'], function() { });