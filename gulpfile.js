const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('concatenar', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js', 
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'js/script.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('recarregar', () => {
    browserSync.init({server: './'});
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('observar', () => {
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['dist/*.js'], ['js']);
    gulp.watch(['index.html', 'css/main.css','dist/bundle.js'], browserSync.reload);
});

gulp.task('default', ['sass', 'concatenar', 'recarregar', 'observar']);