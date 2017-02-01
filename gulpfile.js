var gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  // output files in app folder
  .pipe(gulp.dest('app'))
});

// Requires the gulp-sass plugin
var sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/pages/**/*.+(html|nunjucks)', ['nunjucks']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// concatenate minify
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

//optimise images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

//fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

//clean up
var del = require('del');

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//run sequence
//browser watch just type gulp

var runSequence = require('run-sequence');

gulp.task('default', function (callback) {
  runSequence(['nunjucks', 'sass','browserSync', 'watch'],
    callback
  )
})

//run them all together gulp build
gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['nunjucks', 'sass', 'useref', 'images', 'fonts'],
    callback
  )
})
