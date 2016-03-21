var child = require('child_process');
var fs = require('fs');
var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// ----------------------------------------------
//  Path Definitions
// ----------------------------------------------
var paths = {
  sourcefiles: 'src/main'
}

var src = {
  font: 'src/main/font/*',
  html: 'public/**/*.html',
  icons: 'src/main/svg/icon-*.svg',
  img: 'src/main/img/**/*',
  normalize: 'node_modules/normalize.css/normalize.css',
  scss: 'src/main/sass/**/*.scss',
  svg:  'src/main/svg/**/*.svg',
  svg4everybody: 'node_modules/svg4everybody/dist/svg4everybody.min.js'
}

var compiled = {
  css: 'public/css',
  font: 'public/font',
  img: 'public/img',
  js: 'public/js'
}

var dist = {
  css: 'dist/css',
  font: 'dist/font',
  img: 'dist/img',
  js: 'dist/js'
}


// ----------------------------------------------
//  Functions
// ----------------------------------------------

// delete existing files
function cleanFiles(dir, cb) {
  del(_.values(dir), cb);
}

// copy normalize.css from node_modules into project and rename to .scss
// so that it can be imported into our sass compile process
function copyNormalize() {
  var stream = gulp.src(src.normalize)
    .pipe(plugins.rename(function(path) {
      path.basename = '_' + path.basename,
      path.extname = '.scss'
    }))
    .pipe(gulp.dest(paths.sourcefiles + '/sass/vendors/normalize'));
}

// copy svg4everybody into directory
function copySvg4Everybody(dir) {
  gulp.src(src.svg4everybody)
    .pipe(gulp.dest(dir));
}

// file copying functions
function copyFont(dir) {
  gulp.src(src.font)
    .pipe(gulp.dest(dir));
}

function copyImg() {
  gulp.src(src.img)
    .pipe(gulp.dest(compiled.img));
}

function copySvg() {
  var stream = gulp.src(compiled.img + '/**/*')
    .pipe(gulp.dest(dist.img));
  return stream
}

// compile sass and apply autoprefixer
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

// minify css from public dir and drop into dist dir
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
  return stream;
}

// minify all svg's except icons
function minifySvg() {
  var stream = gulp.src([src.svg, '!' + src.icons])
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
    .pipe(gulp.dest(compiled.img));
  return stream;
}

// combine icon svg's into sprite
function makeSvgSprite() {
  var stream = gulp.src([src.icons])
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
    .pipe(plugins.svgstore())
    .pipe(plugins.rename({
        basename: 'sprite'
      }))
    .pipe(gulp.dest(compiled.img));
  return stream;
}

// wrapper function for processing svg's
function processSvg() {
  minifySvg();
  makeSvgSprite();
}

/// start up browser sync
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
    gulp.watch(src.scss, ['compile:sass']);
    gulp.watch(src.svg, ['compile:svg', reload]);
  }
  return monitor;
}

// update distribution files
function makeDist() {
  copyFont(dist.font);
  minifyCss();
  copySvg();
  copySvg4Everybody(dist.js + '/vendors');
}


// ----------------------------------------------
//  Task Definitions
// ----------------------------------------------

// delete existing files
gulp.task('clean', function() {
  cleanFiles(compiled);
});

// copying stuff
gulp.task('copy:normalize', copyNormalize);

gulp.task('copy:svg4everybody', function() {
  copySvg4Everybody(compiled.js + '/vendors')
});

gulp.task('copy:font', function() {
  copyFont(compiled.font);
});

gulp.task('copy:img', function() {
  copyImg();
})

// dev tasks
gulp.task('compile:sass', compileSass);
gulp.task('compile:svg', processSvg);
gulp.task('minify:svg', minifySvg);
gulp.task('minify:icons', makeSvgSprite);
gulp.task('scsslint', lintSass);
gulp.task('browser-sync', startBS());
gulp.task('watch', watchFiles());

// just process and compile source files
gulp.task('build', function() {
  cleanFiles(compiled, plugins.sequence('clean', ['copy:normalize', 'copy:font',
    'copy:img', 'compile:sass', 'compile:svg', 'copy:svg4everybody']));
});

// process, compile, and start up browsersync and watcher
gulp.task('dev', function() {
  cleanFiles(compiled, plugins.sequence('clean', ['copy:normalize', 'copy:font',
    'copy:img', 'compile:sass', 'compile:svg', 'copy:svg4everybody', 'watch', 'browser-sync']));
});

gulp.task('app', function() {
  cleanFiles(compiled, plugins.sequence('clean', 'server', ['copy:normalize', 'copy:font',
    'copy:img', 'compile:sass', 'compile:svg', 'copy:svg4everybody', 'watch', 'browser-sync']));
});

// update project distribution files
gulp.task('dist', function() {
  cleanFiles(dist, makeDist);
});

gulp.task('server', function() {
  var server = child.spawn('node', ['./bin/www']);

  server.stdout.on('data', function(data) {
    console.log(data.toString());
  });

  server.stdout.on('close', function(code) {
    if (code !== 0) {
      console.log('process exited with code ', code);
    }
  });
});

gulp.task('default', ['build']);
