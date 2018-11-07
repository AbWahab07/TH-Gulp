var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concatScripts', () => {
  gulp.src([
        'js/jquery.js', 
        'js/sticky/jquery.sticky.js', 
        'js/main.js'])
      .pipe(concat("app.js"))
      .pipe(gulp.dest("js"));
});

gulp.task('default', ['concatScripts'], () => {
  console.log('Default Task');
});