var plugins = require('gulp-load-plugins')({ lazy: false });
var source = require('vinyl-source-stream');
var ngannotate = require('browserify-ngannotate');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var mold = require('mold-source-map');

module.exports = function (gulp){


    var browserify = require('browserify'),
        watchify = require('watchify'),
        gulp = require('gulp'),
        source = require('vinyl-source-stream'),
        sourceFile = './dev/js/app.js',
        destFolder = './www/',
        destFile = 'app.js';

    gulp.task('browserify', function() {
        return browserify(sourceFile)
            //.transform(ngannotate)
            .bundle({debug:true})
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));
    });

    gulp.task('watch-browserify', function() {
        var bundler = watchify(sourceFile);
        bundler.on('update', rebundle);

        function rebundle() {
            return bundler.bundle({debug:true})

                .pipe(source(destFile))
                .pipe(gulp.dest(destFolder));
        }

        return rebundle();
    });

    gulp.task('watch-js',['browserify', 'watch-browserify']);

};