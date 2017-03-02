const _gulp = require('gulp');
const _babel = require('gulp-babel');
const _uglify = require('gulp-uglify');
const _rename = require('gulp-rename');
const _sourcemaps = require('gulp-sourcemaps');
const _browserSync = require('browser-sync').create();

const _jsSrcDir = 'src/';
const _jsDistDir = 'dist/';
const _jsFilename = 'swiftclick.js';
const _jsMinifiedFilename = 'swiftclick.min.js';
const _jsExampleLibsDir = 'example/js/libs/';
const _babelConfig = _babel({presets: ['es2015']});
const _uglifyOptions = {
  compress: {
    drop_console: true
  },
  mangle: true,
  beautify: false,
  preserveComments: false
}

_gulp.task('js', () => {
  return _gulp.src(`${_jsSrcDir}${_jsFilename}`)
    .pipe(_sourcemaps.init())
    .pipe(_babelConfig)
    .pipe(_gulp.dest(_jsDistDir))
    .pipe(_rename(_jsMinifiedFilename)) 
    .pipe(_uglify(_uglifyOptions))
    .pipe(_gulp.dest(_jsExampleLibsDir))
    .pipe(_sourcemaps.write('.'))
    .pipe(_gulp.dest(_jsDistDir))
    .pipe(_browserSync.stream({match: '**/*.js'}));
});

_gulp.task('serve', ['js'], () => {
  _browserSync.init({
    server: {
      baseDir: './example'
    },
    notify: false
  });

  // TODO : watch all example files (except libs) and reload the browser on change.

  return _gulp.watch(`${_jsSrcDir}**/*.js`, ['js']);
});
