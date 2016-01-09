var gulp = require('gulp');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var react = require('gulp-react');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var del = require('del');
var gutil = require("gulp-util");
var webpack = require('webpack');

var paths = {
  	scripts: ['src/**/*.js'],
  	less: ['src/**/*.less'],
    motion: ['./example/motion/index.js'],
    test: ['./example/test/src/index.js']
};


gulp.task('less', function () {
  	return gulp.src(paths.less)
      	.pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('view', function(callback) {
    // run webpack
    webpack({
        watch: true,
        errorDetails: true,
        entry: {
            test : "./example/test/src/index.js",
            gameview : "./example/react_game/src/index.js"
        },
        output: {
            path: './example/dist/',
            filename: "[name].bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /\.less$/, loader: "style!less" },
                { test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"] }
            ]
        }
    }, function(err, stats) {
        console.error(err);
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
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
  	gulp.watch(paths.view, ['view']);
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'less', 'view']);

gulp.task('deploy', ['scripts', 'less']);