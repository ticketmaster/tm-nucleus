var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer-core');
var cssmin = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var cssOutputDir = './public/css';
var sassSrcFiles = './src/main/sass/**/*.scss';

// delete previously existing compiled files
gulp.task('clean', function(cb) {
  del([cssOutputDir], cb);
})

// compile sass, applu autoprefixer, and minify
gulp.task('sass', ['clean'], function() {
  gulp.src(sassSrcFiles)
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true
      }))
    .pipe(postcss([
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputDir))
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest(cssOutputDir));
});

gulp.task('watch', function() {
  gulp.watch(sassSrcFiles, function() {
    gulp.start('sass');
  });
});

gulp.task('default', ['sass', 'watch']);
