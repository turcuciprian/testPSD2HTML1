var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
//***********
//
// Watchable files
//
//***********

//
//SASS
//
gulp.task('sass', function() {
    return gulp.src('./src/scss/style.min.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});
//
// Javascript
//

//custom
gulp.task('compressjSCustom', function() {
    return gulp.src('./src/js/custom/*.js')
        .pipe(uglify('custom.min.js', {
            outSourceMap: true,
            mangle: false
        }))
        .pipe(gulp.dest('./js'));
});
//custom
gulp.task('compressjSLib', function() {
    return gulp.src('./src/js/lib/*.js')
        .pipe(uglify('lib.min.js', {
            outSourceMap: true,
            mangle: false
        }))
        .pipe(gulp.dest('./js'));
});
//
// First run files
//

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/*/*.scss', ['sass']);
    gulp.watch('./src/js/lib/*.js', ['compressjSLib']);
    gulp.watch('./src/js/custom/*.js', ['compressjSCustom']);
});
gulp.task('default', ['sass', 'compressjSLib', 'compressjSCustom', 'sass:watch']);
