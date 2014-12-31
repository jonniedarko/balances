var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');

var watchify = require('watchify');

var changed     = require('gulp-changed');

var sh = require('shelljs');

config = {
    index : {
        src : 'dev/index.html',
        dest : 'www/'
    },
    images : {
        src : 'dev/img/**/*',
        dest : 'www/img/'
    },
    css : {
        src : 'dev/css/**/*',
        dest : 'www/css'
    },
    templates : {
        src : 'dev/js/**/*.html',
        dest : 'www/templates/'
    },
    ionicframwork : {
        dest : 'www/lib/ionic/',
        css : {
            src : 'dev/lib/ionic/css/**/*',
            dest : 'www/lib/ionic'
        }
        ,fonts : {
            src : 'dev/lib/ionic/fonts/**/*',
            dest : 'www/lib/ionic'
        }
        ,js : {
            src : 'dev/lib/ionic/js/**/*',
            dest : 'www/lib/ionic'
        }
        //,scss : {
        //    src : 'dev/lib/ionic/scss/**/*',
        //        dest : 'www/lib/'
        //}
    }
};


module.exports = function(gulp){

    require('./scss.task')(gulp);
    require('./browserify.task')(gulp);





    gulp.task('watch', function() {
        gulp.watch(paths.sass, ['sass']);
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

    gulp.task('css-cp', function (){
        return gulp.src(config.css.src)
            .pipe(changed(config.css.dest))
            .pipe(gulp.dest(config.css.dest));

    });
    gulp.task('images-cp', function (){
        return gulp.src(config.images.src)
           .pipe(changed(config.images.dest))
           .pipe(gulp.dest(config.images.dest));

    });
    gulp.task('templates-cp', function(){

        return gulp.src(config.templates.src)
            .pipe(changed(config.templates.src))
            .pipe(gulp.dest(config.templates.dest));


    });
    gulp.task('index-cp', function(){
        return gulp.src(config.index.src)
            .pipe(changed(config.index.dest))
            .pipe(gulp.dest(config.index.dest));

    });
    gulp.task('ionic-cp', function(){

        return gulp.src([config.ionicframwork.css.src
                        ,config.ionicframwork.js.src
                        ,config.ionicframwork.fonts.src
            ], {base : 'dev/lib/ionic'})
            .pipe(changed(config.images.dest))
            .pipe(gulp.dest(config.ionicframwork.dest));

    });

   /* gulp.task('watch-templates', function() {
        var bundler = watchify(config.templates.src, {debug:true});
        bundler.on('update', rebundle);

        function rebundle() {
            return gulp.src(config.templates.src)
                .pipe(gulp.dest(config.templates.dest));
        }

        return rebundle();
    });*/

    gulp.task('default', ['sass', 'ionic-cp', 'css-cp', 'images-cp', 'templates-cp', 'watch-js', 'index-cp']);

};