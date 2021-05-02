var gulp = require('gulp');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var del = require('del');

gulp.task('clean-js', function() {
    return del(['dist/js/*.js']);
});

gulp.task('pack-js', function() {    
    return gulp.src(['assets/js/main.js'])
    .pipe(minify({ ext: { min: '.js' }, noSource: true }))
    .pipe(rev())
    .pipe(gulp.dest('dist/js'))
    .pipe(rev.manifest('dist/rev-manifest.json', { merge: true }))
    .pipe(gulp.dest('./'));
});

gulp.task('clean-css', function() {
    return del(['dist/css/*.css']);
});

gulp.task('pack-css', function() {    
    return gulp.src(['assets/css/style.css'])
    .pipe(cleanCss())
    .pipe(rev())
    .pipe(gulp.dest('dist/css'))
    .pipe(rev.manifest('dist/rev-manifest.json', { merge: true }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series(gulp.parallel('clean-js', 'clean-css'), gulp.parallel('pack-js', 'pack-css')));
