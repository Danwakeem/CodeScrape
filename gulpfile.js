const gulp = require('gulp');
const zip = require('gulp-zip');
 
gulp.task('default', () =>
    gulp.src(['index.js', 'scrape.js', 'node_modules/**', 'package.json'], { base : "." })
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('dist'))
);