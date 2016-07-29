'use strict';
const {task} = require('gulp');

var env = {
  dist: false
}

task('env:dist', (cb) => {
  env.dist = true;
  cb(null);
});

task('env:dev', (cb) => {
  env.dist = false;
  cb(null);
});

module.exports = env;
