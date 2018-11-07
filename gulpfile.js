var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jsbeautifier = require('gulp-jsbeautifier');
    ;

gulp.task('concatScripts', () => {
  gulp.src([
        'js/jquery.js', 
        'js/sticky/jquery.sticky.js', 
        'js/main.js'])
      .pipe(concat("app.js"))
      .pipe(gulp.dest("js"));
});

gulp.task('minifyScripts', () => {
  gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'));
});

/*
gulp.task('prettify', function() {
  gulp.src('js/app.min.js')
    .pipe(jsbeautifier())
    .pipe(rename('app.beautify.js'))
    .pipe(gulp.dest('js'));
});
*/

gulp.task('default', ['concatScripts'], () => {
  console.log('Default Task');
});