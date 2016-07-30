'use strict'

var babel = require('gulp-babel')
var browserify = require('browserify')
var buffer = require('vinyl-buffer')
var cache = require('browserify-file-cache')
var concat = require('gulp-concat')
var del = require('del')
var file = require('gulp-file')
var gulp = require('gulp')
var iife = require('gulp-iife')
var jasmine = require('gulp-jasmine')
var lint = require('gulp-task-standardjs-eslint')
var source = require('vinyl-source-stream')
var sourceMaps = require('gulp-sourcemaps')
var watch = require('gulp-sane-watch')
var glob = require('glob')
var flatten = require('array-flatten')
var futilities = require('futilities')
var compose = futilities.compose
var map = futilities.map

var globAll = compose(map(glob.sync), flatten)

var writeBundle = cachedBrowserify({
  src: globAll([
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/browser/**/!(main).js',
    '.build_tmp/object/app/shared/**/*.js',
    '.build_tmp/object/app/browser/main.js'
  ]),
  dest: 'dist/public/js',
  outputFilename: 'browser.js'
})

function allTasks () {
  return gulp.series(
    clean,
    compile(),
    check(),
    writeBundle,
    linkServer
  )
}

gulp.task('default', allTasks())

gulp.task('check', gulp.series(compile(), check()))

gulp.task('clean', clean)

gulp.task('watch', function () {
  allTasks()(function () {
    watch(['src/**/*.js'], {
      onChange: handleFileChange,
      onAdd: handleFileChange,
      onDelete: function (filepath) {
        gulp.series(deleteObjectFile(filepath), check())(printDivider)
      },
      debounce: 50
    })

    watch(['.build_tmp/object/app/**/*.js'], function () {
      gulp.series(writeBundle, linkServer)()
    })
  })
})

function handleFileChange (filepath) {
  var whatChanged = 'src/' + filepath
  gulp.series(compile(whatChanged), check())(printDivider)
}

function printDivider () {
  var time = new Date().toTimeString().slice(0, 8)
  var message = '==[finished at ' + time + ']'

  console.log(message + Array(80 - message.length).fill('=').join(''))
}

function check () {
  return gulp.series(test, lint(['src/**/*.js', '*.js']))
}

function test () {
  var ofiles = [
    '.build_tmp/object/prelude.js',
    '.build_tmp/object/app/**/!(main).js',
    '.build_tmp/object/spec/**/*.js'
  ]

  return gulp.src(ofiles).pipe(jasmine())
}

function clean () {
  return del('.build_tmp/*')
}

function compile (sources) {
  sources = sources || ['src/**/*.js']

  return function () {
    return gulp.src(sources, { base: 'src' })
      .pipe(prelude())
      .pipe(sourceMaps.init())
        .pipe(compileES2015())
        .pipe(iife())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('.build_tmp/object'))
  }
}

function deleteObjectFile (pathRelativeToSrc) {
  return function () {
    return del('.build_tmp/object/' + pathRelativeToSrc)
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

function cachedBrowserify (options) {
  /* see: https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md */

  var src = options.src
  var dest = options.dest
  var filename = options.outputFilename

  var browserifier = cache(browserify({
    entries: src,
    debug: true // creates sourcemaps
  }))

  return function browserifyBundle () {
    return browserifier.bundle()
      .on('error', function (message) {
        console.log(message)
      })
      .pipe(source(filename))
      .pipe(buffer())
      .pipe(gulp.dest(dest))
  }
}

