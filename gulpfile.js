'use strict'

const gulp = require('gulp')
const iife = require('gulp-iife')
const concat = require('gulp-concat')
const jasmine = require('gulp-jasmine')
const browserify = require('browserify')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
const sourceMaps = require('gulp-sourcemaps')
const esLint = require('gulp-eslint')
const sequence = require('run-sequence')

gulp.task('watch', () => {
  sequence('build', 'print-divider')

  gulp.watch(['src/**/*.js', 'gulpfile.js'], () =>
    sequence('build', 'print-divider')
  )

  gulp.watch(['spec/**/*.js'], () =>
    sequence('check', 'print-divider')
  )
})

gulp.task('print-divider', () => {
  const time = new Date().toTimeString().slice(0, 8)
  const message = `==[finished at ${time}]`

  console.log(message + Array(80 - message.length).fill('=').join(''))
})

gulp.task('build', ['check', 'dist-browser'])

gulp.task('check', ['test', 'lint'])

gulp.task('lint', () => {
  return gulp.src(['@(src|spec)/**/*.js', '*.js'])
    .pipe(esLint())
    .pipe(esLint.format())
})

gulp.task('dist-browser', ['concat-browser'], () => {
  return browserify('tmp/browser.js', {debug: true})
    .bundle()
    .pipe(source('browser.js'))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
      .pipe(compileES2015())
      .pipe(uglify({mangle: false})) // As of June 2016, browser debuggers do not support mapping mangled names back to the original variable name. See https://bugs.chromium.org/p/chromium/issues/detail?id=327092
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist/'))
})

gulp.task('concat-browser', () => {
  return gulp.src(['src/shared/prelude.js', 'src/@(browser|shared)/lib/**/*.js', 'src/browser/main.js'], {base: 'src'})
    .pipe(sourceMaps.init())
      .pipe(iife())
      .pipe(concat('browser.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp/'))
})

gulp.task('test', () => {
  return gulp.src(['src/shared/prelude.js', 'src/*/lib/**/*.js', 'spec/**/*.js'])
    .pipe(iife())
    .pipe(compileES2015())
    .pipe(jasmine())
})

function compileES2015 () {
  return babel({presets: ['es2015']})
}
