var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var plugins = require('gulp-load-plugins')({ lazy: false });
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

var paths = {
    sass: ['../scss/**/*.scss']
};

module.exports = function(gulp){


    gulp.task('default', ['sass']);

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

    gulp.task('watch', function() {
        gulp.watch(paths.sass, ['sass']);
    });

    gulp.task('install', ['git-check'], function() {
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

    gulp.task('browserify', function() {

        var bundler = browserify({
            // Required watchify args
            cache: {}, packageCache: {}, fullPaths: true,
            // Browserify Options
            entries: ['./dev/js/app.js'],
            //extensions: ['.coffee', '.hbs'],
            debug: true
        });

        var bundle = function() {
            return bundler
                .bundle()
                .on('error', plugins.util.log)
                .pipe(source('app.js'))
                .pipe(gulp.dest('./www/'));
        };

        if(global.isWatching) {
            bundler = watchify(bundler);
            bundler.on('update', bundle);
        }

        return bundle();
    });

};