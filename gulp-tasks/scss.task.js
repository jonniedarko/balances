/**
 * Created by jonniedarko on 24 Dec 2014.
 */

var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var paths = {
    sass: ['../scss/**/*.scss']
};

module.exports = function(gulp){
    gulp.task('sass', function(done) {
        gulp.src('../scss/ionic.app.scss')
            .pipe(sass())
            .pipe(gulp.dest('../www/css/'))
            .pipe(minifyCss({
                keepSpecialComments: 0
            }))
            .pipe(rename({ extname: '.min.css' }))
            .pipe(gulp.dest('../www/css/'))
            .on('end', done);
    });
};