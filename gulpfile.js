'use strict';

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

gulp.task('watch', () => {
  gulp.start('build')
  gulp.watch(['src/**/*.js'], ['build', 'lint'])
  gulp.watch(['spec/**/*.js'], ['test', 'lint'])
})

gulp.task('build', ['test', 'dist'])

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'spec/**/*.js'])
    .pipe(esLint())
    .pipe(esLint.format())
})

gulp.task('dist', ['concat'], () => {
  const compileES2015 = babel({presets: ['es2015']})

  return browserify('./tmp/app.js', {debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
      .pipe(compileES2015)
      .pipe(uglify({mangle: false})) // As of June 2016, browsers do not support mapping mangled names back to the original variable name when debugging. See https://bugs.chromium.org/p/chromium/issues/detail?id=327092
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist'))
})

gulp.task('concat', () => {
  return gulp.src(['src/prelude.js', 'src/lib/**/*.js', 'src/main.js'], {base: 'src'})
    .pipe(sourceMaps.init())
      .pipe(iife())
      .pipe(concat('app.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp'))
})

gulp.task('test', ['compile-test-sources'], () => {
  return gulp.src(['tmp/test.js'])
    .pipe(jasmine())
})

gulp.task('compile-test-sources', () => {
  const compileES2015 = babel({presets: ['es2015']})

  return gulp.src(['src/prelude.js', 'src/lib/**/*.js', 'spec/**/*.js'])
    .pipe(iife())
    .pipe(compileES2015) // TODO: the latest version of V8 implements more of the ES2015 spec. See if this can be removed after upgrading Node to the latest version.
    .pipe(concat('test.js'))
    .pipe(gulp.dest('tmp'))
})

