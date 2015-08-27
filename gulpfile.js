var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer-core');
var cssmin = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

var src = {
  html: './public/**/*.html',
  scss: './src/main/sass/**/*.scss'
}
var cssOutputDir = './public/css';
var reload = browserSync.reload;

// delete previously existing compiled files
gulp.task('clean', function(cb) {
  del([cssOutputDir], cb);
});

// compile sass, applu autoprefixer, and minify
gulp.task('sass', ['clean'], function() {
  gulp.src(src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({
          browsers: ['last 2 versions', 'ie >= 9']
        })
      ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssOutputDir))
    .pipe(reload({stream: true}))
    .pipe(cssmin())
    .pipe(rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest(cssOutputDir));
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'localhost:3000'
  });
});

gulp.task('watch', function() {
  gulp.watch(src.html, reload);
  gulp.watch(src.scss, ['sass']);
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);
