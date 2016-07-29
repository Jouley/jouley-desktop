'use strict';
const gulp = require('gulp');
require('require-dir')('./gulp-tasks');

gulp.task('default', gulp.series('env:dist', 'build'));

gulp.task('serve', gulp.series('env:dev', 'build'));
