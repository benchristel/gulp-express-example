const gulp = require('gulp')
const jasmine = require('gulp-jasmine')
const browserify = require('browserify')
const babel = require('gulp-babel')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')

compileES2015 = babel({presets: ['es2015']})

gulp.task('test', () => {
  const sourceFiles = gulp.src(['lib/**/*.js', 'spec/**/*.js', './main.js'])
  
  // run the tests
  gulp.src(['lib/**/*.js', 'spec/**/*.js'])
    .pipe(jasmine())

  // build the app.js file
  browserify({entries: './main.js', debug: true})
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(compileES2015)
    .pipe(gulp.dest('dist'))
})

