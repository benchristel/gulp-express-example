'use strict'

const gulp = require('gulp')
const iife = require('gulp-iife')
const concat = require('gulp-concat')
const jasmine = require('gulp-jasmine')
const browserify = require('browserify')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourceMaps = require('gulp-sourcemaps')
const esLint = require('gulp-eslint')
const plumber = require('gulp-plumber')

gulp.task('watch', () => {
  return gulp.series(build, printDivider)(() => {
    // beware!
    // Due to a bug (?) in one of gulp's dependencies,
    // `gulp.watch` will not notice created or deleted files
    // in paths beginning with './'
    gulp.watch(['src/**/*.js', 'gulpfile.js'],
      gulp.series(build, printDivider))

    return gulp.watch(['spec/**/*.js'],
      gulp.series(check, printDivider))
  })
})

function printDivider (done) {
  const time = new Date().toTimeString().slice(0, 8)
  const message = `==[finished at ${time}]`

  console.log(message + Array(80 - message.length).fill('=').join(''))
  done()
}

const check = gulp.series(test, lint)

function test (done) {
  const source = [
    'src/shared/prelude.js',
    'src/*/lib/**/*.js',
    'spec/**/*.js'
  ]

  gulp.src(source)
    .pipe(plumber())
    .pipe(iife())
    .pipe(compileES2015())
    .pipe(jasmine())
    .on('jasmineDone', done)
    .on('error', (err) => {
      console.error(err.message)
      done()
    })
}

function lint (done) {
  return gulp.src(['@(src|spec)/**/*.js', '*.js'])
    .pipe(plumber())
    .pipe(esLint())
    .pipe(esLint.format('stylish', process.stdout))
}

const build = gulp.series(concatBrowser, distBrowser, distServer)

function distBrowser (done) {
  browserify('tmp/browser.js', {debug: true})
    .bundle()
    .pipe(source('browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/public/js'))
    .on('end', done)
}

function concatBrowser (done) {
  const source = [
    'src/shared/prelude.js',
    'src/@(browser|shared)/lib/**/*.js',
    'src/browser/main.js'
  ]

  return gulp.src(source, {base: 'src'})
    .pipe(plumber())
    .pipe(sourceMaps.init())
      .pipe(compileES2015())
      .pipe(iife())
      .pipe(concat('browser.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp/'))
    .on('end', done)
}

function distServer (done) {
  const source = [
    'src/shared/prelude.js',
    'src/@(server/shared)/lib/**/*.js',
    'src/server/main.js'
  ]

  return gulp.src(source, {base: 'src'})
    .pipe(plumber())
    .pipe(iife())
    .pipe(concat('server.js'))
    .pipe(compileES2015())
    .pipe(gulp.dest('dist'))
    .on('end', done)
}

gulp.task('build', gulp.series(check, build))

gulp.task('check', check)

gulp.task('test', test)

gulp.task('lint', lint)

gulp.task('concat-browser', concatBrowser)

gulp.task('dist-server', distServer)

function compileES2015 () {
  return babel({presets: ['es2015']})
}
