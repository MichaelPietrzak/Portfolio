const gulp         = require('gulp');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const plumber      = require('gulp-plumber');


gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'public',
            // index: './index.html'
        },
        open: false,
        notify: false,
        logLevel: 'debug'
    });

    gulp.watch('docs/sass/**/*.scss', ['sass']);
    gulp.watch('docs/js/**/*.*', ['js']);
    gulp.watch(['./docs/**/*.html'], ['html'])
        .on('change', browserSync.reload);
});

gulp.task('sass', () => {
    return gulp.src('./sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css/main.css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', () => {
    const dst = 'public/js/';

    return gulp.src('./docs/js/app.js')
        .pipe(plumber())
        .pipe(gulp.dest(dst))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', () => {
    gulp.src(['docs/*.html'], {
        base: 'docs/'
    })
    .pipe(plumber())
    .pipe(gulp.dest('./public/'));
});


gulp.task('default', ['sass', 'js', 'html', 'browser-sync',]);
