'use-strict';
const libraryController = require('./scripts/library-controller');
const id3 = require('id3js');
window.JouleyApp = window.JouleyApp || {};
window.JouleyApp.library = libraryController.library;

window.id3 = id3;
