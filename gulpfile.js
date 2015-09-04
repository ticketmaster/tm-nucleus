var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
// var map = require('map-stream');
var browserSync = require('browser-sync');

var paths = {
  sourcefiles: 'src/main'
}

var src = {
  html: 'public/**/*.html',
  scss: 'src/main/sass/**/*.scss',
  svg:  'src/main/svg/**/*.svg',
  normalize: 'node_modules/normalize.css/normalize.css',
  font: 'src/main/font/*'
}

var compiled = {
  css: 'public/css',
  svg: 'public/img',
  font: 'public/font'
}

var dist = {
  css: 'dist/css',
  svg: 'dist/img',
  font: 'dist/font'
}

var reload = browserSync.reload;

// var exitOnLintError = map(function(file, cb) {
//   if (!file.scsslint.success) {
//     console.error('scsslint failed');
//     process.exit(1);
//   }
// });

function cleanFiles(cb) {
  del(_.values(compiled), cb);
}

function cleanDist(cb) {
  del(_.values(dist), cb);
}

// copy normalize.css from node_modules into project and rename to .scss
// so that it can be imported into our sass compile process
function grabNormalize() {
  var stream = gulp.src(src.normalize)
    .pipe(plugins.rename(function(path){
      path.basename = '_' + path.basename,
      path.extname = '.scss'
    }))
    .pipe(gulp.dest(paths.sourcefiles + '/sass/vendors/normalize'));
}

// compile sass, apply autoprefixer, and minify
function compileSass() {
  var stream = gulp.src(src.scss)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(compiled.css))
    .pipe(reload({ stream: true }));
  return stream;
}

function minifyCss() {
  var stream = gulp.src([compiled.css + '/**/*', '!' + compiled.css + '/styleguide*'])
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest(dist.css));
  return stream;
}

// run scsslint
function lintSass() {
  var stream = gulp.src([src.scss, '!src/main/sass/vendors/**/*.scss'])
    .pipe(plugins.scssLint({
      'config': 'scss-lint.yml',
      'reporterOutput': 'lint-report.json'
      }))
    // .pipe(exitOnLintError);
  return stream;
}

// minify svg, combine into sprite
function processSvg() {
  var stream = gulp.src(src.svg)
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
    .pipe(gulp.dest(compiled.svg))
    .pipe(plugins.svgstore())
    .pipe(plugins.rename({
        basename: 'sprite'
      }))
    .pipe(gulp.dest(compiled.svg));
  return stream;
}

function copyFont() {
  var stream = gulp.src(src.font)
    .pipe(gulp.dest(compiled.font))
    .pipe(gulp.dest(dist.font));
  return stream;
}

function copySvg() {
  var stream = gulp.src(compiled.svg + '/**/*')
    .pipe(gulp.dest(dist.svg));
  return stream
}

// start up browser sync
function startBS() {
  function syncBrowser() {
    browserSync.init(null, {
      proxy: 'localhost:3000'
    });
  }
  return syncBrowser;
}

// monitor source files for changes
function watchFiles() {
  function monitor() {
    gulp.watch(src.html, reload);
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.svg, ['svg'], reload);
  }
  return monitor;
}

function makeDist() {
  copyFont();
  minifyCss();
  copySvg();
}

// delete existing compiled files
gulp.task('clean', cleanFiles);
gulp.task('clean-dist', cleanDist);
gulp.task('normalize', grabNormalize);
gulp.task('sass', compileSass);
gulp.task('scsslint', lintSass);
gulp.task('svg', processSvg);
gulp.task('copy-font', copyFont);
gulp.task('make-dist', makeDist);
gulp.task('browser-sync', startBS());

// monitor file changes/additions
gulp.task('watch', watchFiles());

// set sequence tasks
gulp.task('dev-sequence', plugins.sequence('clean', ['copy-font', 'sass', 'svg', 'watch', 'browser-sync']));
gulp.task('prod-sequence', plugins.sequence('clean', ['copy-font', 'sass', 'svg']));
gulp.task('pub-sequence', plugins.sequence('clean-dist', ['make-dist']));

// dev task - starts browsersync and file monitoring
gulp.task('dev', ['dev-sequence']);

// distribution task - publishes required into dist directory
gulp.task('dist', ['pub-sequence']);

// prod task - just process and compile source files
gulp.task('default', ['prod-sequence']);
