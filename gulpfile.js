var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var scsslint = require('gulp-scss-lint');

var src = {
  html: 'public/**/*.html',
  scss: 'src/main/sass/**/*.scss',
  svg:  'src/main/svg/**/*.svg'
}

var output = {
  css: 'public/css',
  svg: 'public/img/svg'
}

var reload = browserSync.reload;

scsslint({
  config: 'scss-lint.yml',
  reporterOutput: 'lint-report.xml'
});

// delete previously existing compiled files
gulp.task('clean', function(cb) {
  del(_.values(output), cb);
});

// compile sass, apply autoprefixer, and minify
gulp.task('scsslint', function() {
  gulp.src(src.scss, [
    'src/main/sass/vendors/**/*.scss',
    'src/main/sass/base/_normalize.scss'
  ])
  .pipe(scsslint());
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
    .pipe(gulp.dest(output.css))
    .pipe(reload({stream: true}))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
        suffix: '.min'
      }))
    .pipe(gulp.dest(output.css));
});

// minify svg and combine into sprite
gulp.task('svg', ['clean'], function() {
  gulp.src(src.svg)
    .pipe(plugins.svgmin({
      plugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: false },
        { removeEmptyAttrs: false },
        { removeTitle: false },
        { removeDesc: true }
      ],
      js2svg: {
        pretty: true
      }}))
    .pipe(gulp.dest(output.svg))
    .pipe(plugins.svgstore())
    .pipe(plugins.rename({
        basename: 'sprite'
      }))
    .pipe(gulp.dest(output.svg));
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'localhost:3000'
  });
});

gulp.task('watch', function() {
  gulp.watch(src.html, reload);
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.svg, ['svg']);
});

gulp.task('default', ['sass', 'svg', 'browser-sync', 'watch']);
