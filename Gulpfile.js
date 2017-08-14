// Libraries
var gulp = require('gulp'); 
var less    = require('gulp-less');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var cssmin  = require('gulp-cssmin');
var concat = require('gulp-concat');

var jsFiles = 'src/js/controller.js';
var pluginsFiles = 'src/js/plugins.js';
var lessFiles = 'src/less/style.less';
var cssFiles = 'src/css/*.css';

gulp.task('less', function() {
    return gulp.src(lessFiles)
        .pipe(rename('style.min.css'))
        .pipe(less())
        .pipe(cssmin())
        .on('error', swallowError)
        .pipe(gulp.dest('css'))
});

gulp.task('css_vendor', function() {  
    return gulp.src(cssFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('css'))
        .pipe(rename('vendor.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('css'));
});

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .on('error', swallowError)
        .pipe(gulp.dest('js'));
});

gulp.task('plugins', function() {  
    return gulp.src(pluginsFiles)
        .pipe(rename('plugins.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

// Watch
gulp.task('watch', function() { 
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/css/*.css', ['css_vendor']);
    gulp.watch('src/js/controller.js', ['scripts']);
    gulp.watch('src/js/plugins.js', ['plugins']);
});

// Default Task
gulp.task('default', ['watch']);


function swallowError (error) {
  // If you want details of the error in the console
  console.log(error.toString())
  this.emit('end')
}