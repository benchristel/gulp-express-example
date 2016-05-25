const gulp = require('gulp')
const jasmine = require('gulp-jasmine')

gulp.task('test', () => {
  gulp.src('src/**/*.js')
    .pipe(jasmine())
})
