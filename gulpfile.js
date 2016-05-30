const gulp = require('gulp')
const iife = require('gulp-iife')
const concat = require('gulp-concat')
const jasmine = require('gulp-jasmine')
const browserify = require('browserify')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const debug = require('gulp-debug')
const webpack = require('gulp-webpack')
const named = require('vinyl-named')

compileES2015 = babel({presets: ['es2015']})

gulp.task('build', ['test', 'concat'], () => {
  browserify('./tmp/app.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(compileES2015)
    .pipe(gulp.dest('dist'))
})

gulp.task('concat', () => {
  gulp.src(['lib/**/*.js', './main.js'])
    .pipe(iife())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('tmp'))
})

gulp.task('test', () => {
  gulp.src(['lib/**/*.js', 'spec/**/*.js'])
    .pipe(jasmine())
})

