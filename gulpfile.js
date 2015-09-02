var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var paths = {
  sourcefiles: 'src/main'
}

var src = {
  html: 'public/**/*.html',
  scss: 'src/main/sass/**/*.scss',
  svg:  'src/main/svg/**/*.svg',
  normalize: 'node_modules/normalize.css/normalize.css'
}

var output = {
  css: 'public/css',
  svg: 'public/img/svg'
}

var reload = browserSync.reload;

function grabNormalize() {
  return gulp.src(src.normalize)
    .pipe(plugins.rename(function(path){
      path.basename = '_' + path.basename,
      path.extname = '.scss'
    }))
    .pipe(gulp.dest(paths.sourcefiles + '/sass/vendors/normalize'));
}

// compile sass, apply autoprefixer, and minify
function compileSass() {
  return gulp.src(src.scss)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(output.css))
    .pipe(reload({ stream: true }))
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest(output.css));
}

function lintSass() {
  return gulp.src([src.scss, '!src/main/sass/vendors/**/*.scss', '!src/main/sass/base/_normalize.scss'])
    .pipe(plugins.scssLint({
      'config': 'scss-lint.yml',
      'reporterOutput': 'lint-report.json'
    }));
}

// minify svg, combine into sprite
function processSvg() {
  return gulp.src(src.svg)
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
}

// delete existing compiled files
gulp.task('clean', function(cb) {
  del(_.values(output), cb);
});

gulp.task('normalize', grabNormalize);

gulp.task('sass', compileSass);

gulp.task('scsslint', lintSass);

// minify svg and combine into sprite
gulp.task('svg', processSvg);

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'localhost:3000'
  });
});

gulp.task('watch', function() {
  gulp.watch(src.html, reload);
  gulp.watch(src.scss,
    gulp.series('sass')
  );
  gulp.watch(src.svg,
    gulp.series('svg', reload)
  );
});

gulp.task('default',
  gulp.series('clean',
    gulp.parallel('sass', 'svg', 'browser-sync', 'watch')
  )
);
