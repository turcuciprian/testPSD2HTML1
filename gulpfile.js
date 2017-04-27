var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
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
// First run files
//

gulp.task('sass:watch', function() {
    gulp.watch('./src/scss/custom/*.scss', ['sass']);
    gulp.watch('./src/scss/*/*.scss', ['sass']);

});
gulp.task('default', ['sass', 'sass:watch']);
