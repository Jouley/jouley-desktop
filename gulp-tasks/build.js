'use strict';
const gulp = require('gulp');
const merge = require('gulp-merge');
const size = require('gulp-size');
const replace = require('gulp-replace');
const _if = require('gulp-if');
const env = require('./env');

gulp.task('copy:app', () => {
  return  gulp.src([
    'src/jouley/build/bundled/**/*',
    '!src/jouley/build/bundled/images'
  ])
  .pipe(size({title: 'copy'}))
  .pipe(_if('index.html', replace(/<\/body>/g, '</body>\n<script src="renderer.js"></script>')))
  .pipe(_if('index.html' && !env.dist,
    replace(',"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/service-worker.js")});', ';// serviceWorker disabled'))
  )
  .pipe(_if('index.html' && !env.dist,
    replace('/src', 'src'))
  )
  .pipe(gulp.dest('app'));
});

gulp.task('copy:images', () => {
  return gulp.src([
    'src/jouley/build/bundled/images/**/*'
  ])
  .pipe(size({title: 'copy'}))
  .pipe(gulp.dest('app/images'));
});

gulp.task('copy:desktop-shell', () => {
  var index = gulp.src([
    'src/index.js'
  ])
  .pipe(gulp.dest('app'));

  var renderer = gulp.src([
    'src/renderer.js'
  ])
  .pipe(gulp.dest('app'));

  var scripts = gulp.src([
    'src/scripts/*'
  ])
  .pipe(gulp.dest('app/scripts'));

  return merge(index, renderer, scripts).pipe(
    size({title: 'copy desktop-shell'})
  );
});

gulp.task('build', gulp.series('copy:app', 'copy:images', 'copy:desktop-shell'))
