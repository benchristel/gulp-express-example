'use strict'

var gulp = require('gulp')
var iife = require('gulp-iife')
var concat = require('gulp-concat')
var jasmine = require('gulp-jasmine')
var browserify = require('browserify')
var babel = require('gulp-babel')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourceMaps = require('gulp-sourcemaps')
var esLint = require('gulp-eslint')
var watch = require('gulp-sane-watch')
var file = require('gulp-file')
var glob = require('glob')
var watchify = require('watchify')

/* see: https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md */

var browserifier = watchify(browserify({
  /* entry point for Browserify; files `require`d in the manifest
   * will be included in the bundle */
  entries: ['.build_tmp/manifest.js'],
  /* the debug: true option makes browserify generate sourcemaps */
  debug: true,
  cache: {}, packageCache: {}
}))

browserifier.on('update', writeBrowserifyBundle)
browserifier.on('log', function (message) {
  console.log(message)
})

gulp.task('default',
  gulp.series(compile(), test, lint)
)

gulp.task('check',
  gulp.series(compile(), test, lint)
)

gulp.task('watch', function () {
  writeBrowserifyBundle()

  watch(['src/**/*.js', 'gulpfile.js'], function (filename, path) {
    var fullName = path + '/' + filename
    lint()
    gulp.series(compile(fullName), test)(printDivider)
  })

  watch(['.build_tmp/object/app/**/*.js'], function () {
    gulp.series(writeManifest, writeBrowserifyBundle, linkServer)()
  })
})

function writeBrowserifyBundle () {
  return browserifier.bundle()
    .on('error', function (message) {
      console.log(message)
    })
    .pipe(source('browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/public/js/'))
}

function printDivider () {
  var time = new Date().toTimeString().slice(0, 8)
  var message = '==[finished at ' + time + ']'

  console.log(message + Array(80 - message.length).fill('=').join(''))
}

function test () {
  var ofiles = [
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/**/!(main).js',
    '.build_tmp/object/spec/**/*.js'
  ]

  return gulp.src(ofiles).pipe(jasmine())
}

function compile (sources) {
  sources = sources || ['src/**/*.js']

  return function () {
    return gulp.src(sources)
      .pipe(prelude())
      .pipe(sourceMaps.init())
        .pipe(compileES2015())
        .pipe(iife())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('.build_tmp/object'))
  }
}

function linkServer () {
  var ofiles = [
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/@(shared|server)/**/!(main).js',
    '.build_tmp/object/app/server/main.js'
  ]

  return gulp.src(ofiles)
    .pipe(sourceMaps.init())
      .pipe(concat('server.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist/'))
}

function lint () {
  return gulp.src(['src/**/*.js', '*.js'])
    .pipe(esLint())
    .pipe(esLint.format('stylish', process.stdout))
    .pipe(esLint.failAfterError())
}

function compileES2015 () {
  return babel({ presets: ['es2015'] })
}

function prelude () {
  var contents =
    "var Yavanna = require('@benchristel/yavanna')()\n" +
    "if (typeof window === 'object') window.Yavanna = Yavanna\n" +
    "if (typeof global === 'object') global.Yavanna = Yavanna\n"

  return file('prelude.js', contents)
}

function expandGlobs (globs) {
  return globs
    .map(function (g) { return glob.sync(g) })
    .reduce(function (a, b) { return a.concat(b) })
}

function writeManifest () {
  var contents = expandGlobs([
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/browser/**/!(main).js',
    '.build_tmp/object/app/shared/**/*.js',
    '.build_tmp/object/app/browser/main.js'
  ])
  .map(upOneDirectory)
  .map(wrapInRequireCall).join('\n')

  return file('manifest.js', contents, { src: true })
    .pipe(gulp.dest('.build_tmp/'))
}

function wrapInRequireCall (path) {
  return "require('" + path + "')"
}

function upOneDirectory (path) {
  return '../' + path
}
