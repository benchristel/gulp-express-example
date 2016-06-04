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

const compileES2015 = babel({presets: ['es2015']})

gulp.task('build', ['test', 'concat'], () => {
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
  return gulp.src(['./prelude.js', 'lib/**/*.js', './main.js'])
    .pipe(sourceMaps.init())
      .pipe(iife())
      .pipe(concat('app.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp'))
})

gulp.task('test', ['concat'], () => {
  return gulp.src(['./tmp/app.js', 'spec/**/*.js'])
    .pipe(jasmine())
})

