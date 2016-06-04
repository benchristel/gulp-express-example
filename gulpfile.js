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
  browserify('./tmp/app.js', {debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true})) // todo verify loadMaps is needed
      .pipe(compileES2015)
      .pipe(uglify({mangle: false})) // As of June 2016, browsers do not support mapping mangled names back to the original variable name when debugging. See https://bugs.chromium.org/p/chromium/issues/detail?id=327092
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('dist'))
})

gulp.task('concat', () => {
  gulp.src(['lib/**/*.js', './main.js'])
    .pipe(sourceMaps.init({identityMap: true}))
      .pipe(iife())
      .pipe(concat('app.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('tmp'))
})

gulp.task('test', () => {
  gulp.src(['lib/**/*.js', 'spec/**/*.js'])
    .pipe(jasmine())
})

