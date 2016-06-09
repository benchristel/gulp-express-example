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

const js = {
  // JS files in src become part of the compiled app.
  src: 'src/**/*.js',

  // Always runs before libs (below) are loaded.
  // By default it inits the dependency injector.
  prelude: 'src/prelude.js',

  // Injectable modules - i.e. stuff you should unit-test
  lib: 'src/lib/**/*.js',

  // Boots the app; runs after the files in lib/ are loaded.
  // Not loaded when running tests.
  main: 'src/main.js',

  // The tests
  spec: 'spec/**/*.js',

  // This file!
  gulpfile: 'gulpfile.js'
}

const dirs = {
  // The build process puts intermediate files here:
  tmp: 'tmp/',

  // The final, shiny output goes here:
  dist: 'dist/'
}

const outputFiles = {
  // This compiled file is the ultimate product of the build.
  // It goes in dirs.dist.
  app: 'app.js',

  // This test file will be generated in tmp/ and run by Jasmine.
  specs: 'specs.js'
}

const tmpApp = dirs.tmp + outputFiles.app
const tmpSpecs = dirs.tmp + outputFiles.specs

gulp.task('watch', () => {
  gulp.start('build')
  gulp.watch([js.src, js.gulpfile], ['build'])
  gulp.watch([js.spec], ['check'])
})

gulp.task('build', ['check', 'dist'])

gulp.task('check', ['test', 'lint'])

gulp.task('test', ['compile-test-sources'], () => {
  return gulp.src([tmpSpecs])
    .pipe(jasmine())
})

gulp.task('lint', () => {
  return gulp.src([js.src, js.spec, js.gulpfile])
    .pipe(esLint())
    .pipe(esLint.format())
})

//
// Tasks below are not intended to be run from the command line.
//

gulp.task('compile-test-sources', () => {
  const compileES2015 = babel({presets: ['es2015']})

  return gulp.src([js.prelude, js.lib, js.spec])
    .pipe(iife())
    .pipe(compileES2015) // TODO: the latest version of V8 implements more of the ES2015 spec. See if this can be removed after upgrading Node to the latest version.
    .pipe(concat(outputFiles.specs))
    .pipe(gulp.dest(dirs.tmp))
})

gulp.task('dist', ['concat'], () => {
  const compileES2015 = babel({presets: ['es2015']})

  return browserify(tmpApp, {debug: true})
    .bundle()
    .pipe(source(outputFiles.app))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
      .pipe(compileES2015)
      .pipe(uglify({mangle: false})) // As of June 2016, browsers do not support mapping mangled names back to the original variable name when debugging. See https://bugs.chromium.org/p/chromium/issues/detail?id=327092
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(dirs.dist))
})

gulp.task('concat', () => {
  return gulp.src([js.prelude, js.lib, js.main], {base: 'src'})
    .pipe(sourceMaps.init())
      .pipe(iife())
      .pipe(concat(outputFiles.app))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(dirs.tmp))
})
