const gulp = require('gulp');
const less = require('gulp-less');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();
const argv = require('yargs').argv;
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');


let env = (argv.env == 'prod') ? false : true; // use gulp build --env = 'prod' for building on production
let config = {
    'app': './src',
    'css': {
        'watch': '/preproc/compile/**/*.*',
        'dest': '/css',
        'prod': '/css',
        'src': '/preproc/compile/**/*.*',
    },
    'html': {
        'src': '/*.html',
        'prod': '../temps'
    }
};

gulp.task('build', function () {
    gulp.src(config.app + config.css.src)
        .pipe(gulpIf(!env,plumber()))
        .pipe(gulpIf(env, sourcemaps.init()))
        .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        // .pipe(gulpIf(!env, cleanCSS()))
        .pipe(gulpIf(env, sourcemaps.write('.')))
        .pipe(gulpIf(env, gulp.dest(config.app + config.css.dest)))
});

gulp.task('prod', function() {
    gulp.src(config.app + config.css.src)
    .pipe(less())
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
    .pipe(gulp.dest(config.css.prod))
    gulp.src(config.app + config.html.src)
    .pipe(gulp.dest(config.html.prod))
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.app
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(config.app + config.css.watch, ['build', browserSync.reload]);
    gulp.watch(config.app + config.html.src, browserSync.reload);
});