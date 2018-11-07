var gulp = require('gulp');

gulp.task('hello', () => {
  console.log('Hello Gulp');
});

gulp.task('default', ['hello'], () => {
  console.log('Default Task');
});