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

gulp.task('watch', function () {
  watch(['src/**/*.js', 'gulpfile.js'], function () {
    gulp.series(test, lint, build)(printDivider)
  })

  watch(['spec/**/*.js'], function () {
    gulp.series(test, lint)(printDivider)
  })
})

function printDivider () {
  var time = new Date().toTimeString().slice(0, 8)
  var message = '==[finished at ' + time + ']'

  console.log(message + Array(80 - message.length).fill('=').join(''))
}

var check = gulp.series(test, lint)

function test () {
  var source = [
    'src/shared/prelude.js',
    'src/*/lib/**/*.js',
    'spec/**/*.js'
  ]

  return gulp.src(source)
    .pipe(iife())
    .pipe(compileES2015())
    .pipe(jasmine())
}

function lint () {
  return gulp.src(['@(src|spec)/**/*.js', '*.js'])
    .pipe(esLint())
    .pipe(esLint.format('stylish', process.stdout))
    .pipe(esLint.failAfterError())
}

var build = gulp.series(concatBrowser, distBrowser, distServer)

function distBrowser () {
  return browserify('tmp/browser.js', { debug: true })
    .bundle()
    .pipe(source('browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/public/js'))
}

function concatBrowser () {
  var source = [
    'src/shared/prelude.js',
    'src/@(browser|shared)/lib/**/*.js',
    'src/browser/main.js'
  ]

  return gulp.src(source, { base: 'src' })
    .pipe(sourceMaps.init())
      .pipe(compileES2015())
      .pipe(iife())
      .pipe(concat('browser.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp/'))
}

function distServer () {
  var source = [
    'src/shared/prelude.js',
    'src/@(server/shared)/lib/**/*.js',
    'src/server/main.js'
  ]

  return gulp.src(source, { base: 'src' })
    .pipe(iife())
    .pipe(concat('server.js'))
    .pipe(compileES2015())
    .pipe(gulp.dest('dist'))
}

gulp.task('build', gulp.series(check, build))

gulp.task('check', check)

gulp.task('test', test)

gulp.task('lint', lint)

gulp.task('concat-browser', concatBrowser)

gulp.task('dist-server', distServer)

function compileES2015 () {
  return babel({ presets: ['es2015'] })
}
