const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jsbeautifier = require('gulp-jsbeautifier'),
    sass = require('gulp-sass')
    maps = require('gulp-sourcemaps')
    del = require('del'),
    browserSync = require('browser-sync').create();;

gulp.task('watchFiles', ['browserSync'], () => {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('concatScripts', () => {
  return gulp.src([
        'js/jquery.js', 
        'js/sticky/jquery.sticky.js', 
        'js/main.js'])
      .pipe(maps.init())
      .pipe(concat("app.js"))
      .pipe(maps.write('./'))
      .pipe(gulp.dest("js"))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
  return gulp.src('js/app.js')
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

gulp.task('compileSass', () => {
  return gulp.src('scss/application.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('clean', () => {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], () => {
  return gulp.src(['index.html', 'img/**', 'fonts/**', 'css/application.css', 'js/app.min.js'], {base: './'}) 
             .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});