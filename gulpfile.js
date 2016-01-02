var gulp = require('gulp');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var del = require('del');

var paths = {
  	scripts: ['src/**/*.js'],
  	less: ['src/**/*.less']
};


gulp.task('less', function () {
	return gulp.src(paths.less)
  	.pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(babel())
  	.pipe(uglify())
  	.pipe(concat('sdm.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
  	gulp.watch(paths.scripts, ['scripts']);
  	gulp.watch(paths.less, ['less']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'less']);