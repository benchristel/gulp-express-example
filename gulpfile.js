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

gulp.task('default',
  gulp.parallel(
    gulp.series(compile, test, linkBrowser),
    lint
  )
)

gulp.task('check',
  gulp.parallel(
    gulp.series(compile, test),
    lint
  )
)

gulp.task('watch', function () {
  watch(['src/**/*.js', 'gulpfile.js'], function () {
    gulp.series(lint, compile, test)(printDivider)
  })

  watch(['.build_tmp/object/**/*.js'], function () {
    gulp.parallel(linkBrowser, linkServer)
  })
})

function printDivider () {
  var time = new Date().toTimeString().slice(0, 8)
  var message = '==[finished at ' + time + ']'

  console.log(message + Array(80 - message.length).fill('=').join(''))
}

function test (done) {
  var ofiles = [
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/**/!(main).js',
    '.build_tmp/object/spec/**/*.js'
  ]

  return gulp.src(ofiles).pipe(jasmine())
}

function compile () {
  return gulp.src(['src/**/*.js'])
    .pipe(sourceMaps.init())
      .pipe(compileES2015())
      .pipe(iife())
    .pipe(sourceMaps.write())
    .pipe(prelude())
    .pipe(gulp.dest('.build_tmp/object'))
}

function link () {
  return gulp.parallel(linkBrowser)
}

function linkBrowser () {
  function concatObjects () {
    var ofiles = [
      '.build_tmp/object/prelude.js',
      '.build_tmp/object/app/browser/**/!(main).js',
      '.build_tmp/object/app/browser/main.js'
    ]

    return gulp.src(ofiles)
      .pipe(sourceMaps.init())
        .pipe(concat('browser.js'))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('.build_tmp'))
  }

  function doBrowserify () {
    return browserify('.build_tmp/browser.js', { debug: true })
      .bundle()
      .pipe(source('browser.js'))
      .pipe(buffer())
      .pipe(gulp.dest('dist/public/js'))
  }

  return gulp.series(concatObjects, doBrowserify)
}

function linkServer () {
  var ofiles = [
    'object/app/@(shared|server)/**/!(main).js',
    'object/app/server/main.js'
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
