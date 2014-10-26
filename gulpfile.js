// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

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

gulp.task('default', ['jshint', 'concat'], function() { });