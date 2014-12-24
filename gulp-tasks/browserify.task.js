var plugins = require('gulp-load-plugins')({ lazy: false });
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var mold = require('mold-source-map');

module.exports = function (gulp){

    // src : https://github.com/greypants/gulp-starter/issues/20
    /*gulp.task('browserify', function() {

        var bundler = browserify({
            // Required watchify args
            cache: {}, packageCache: {}, fullPaths: true,
            // Browserify Options
            entries: ['./dev/js/app.js'],
            //extensions: ['.coffee', '.hbs'],
            transform: reactify,
            debug: true
        });

        var bundle = function() {
            return bundler
                .bundle()
                .on('error', plugins.util.log)
                .pipe(source('app.js'))
                .pipe(gulp.dest('./www/'))
                .pipe(mold.transformSourcesRelativeTo('./'))
                .pipe(source('app.js'))
                .pipe(gulp.dest('./www/js'));
        };

        if(global.isWatching) {
            bundler = watchify(bundler);
            bundler.on('update', bundle);
        }

        return bundle();
        return browserify('./dev/js/app.js', {transform: reactify, debug: true})
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./www'));

    });*/

    var browserify = require('browserify'),
        watchify = require('watchify'),
        gulp = require('gulp'),
        source = require('vinyl-source-stream'),
        sourceFile = './dev/js/app.js',
        destFolder = './www/',
        destFile = 'app.js';

    gulp.task('browserify', function() {
        return browserify(sourceFile, {debug:true})
            .bundle()
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));
    });

    gulp.task('watch-browserify', function() {
        var bundler = watchify(sourceFile, {debug:true});
        bundler.on('update', rebundle);

        function rebundle() {
            return bundler.bundle()
                .pipe(source(destFile))
                .pipe(gulp.dest(destFolder));
        }

        return rebundle();
    });

    gulp.task('watch-js',['browserify', 'watch-browserify']);

};