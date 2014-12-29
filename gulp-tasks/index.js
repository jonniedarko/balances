var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');

var changed     = require('gulp-changed');

var sh = require('shelljs');

config = {
    images : {
        src : 'dev/img/**/*',
        dest : 'www/img/'
    }
};


module.exports = function(gulp){

    require('./scss.task')(gulp);
    require('./browserify.task')(gulp);

    gulp.task('default', ['sass', 'watch-js']);



    gulp.task('watch', function() {
        gulp.watch(paths.sass, ['sass']);
    });

    /*gulp.task('install', ['git-check'], function() {
        return bower.commands.install()
            .on('log', function(data) {
                gutil.log('bower', gutil.colors.cyan(data.id), data.message);
            });
    });

    gulp.task('git-check', function(done) {
        if (!sh.which('git')) {
            console.log(
                '  ' + gutil.colors.red('Git is not installed.'),
                '\n  Git, the version control system, is required to download Ionic.',
                '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
                '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
            );
            process.exit(1);
        }
        done();
    });
    */

    gulp.task('images-cp', function (){
        gulp.src(config.images.src)
           .pipe(changed(config.images.dest))
           .pipe(gulp.dest(config.images.dest));
        return x;
    });



};