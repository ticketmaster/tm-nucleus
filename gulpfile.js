var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

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
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9']
      }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(cssOutputDir))
    .pipe(reload({stream: true}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
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
