'use strict';
const {app} = require('electron');
const electron = require('electron');
const squirelStartupHandler = require('./squirrel-startup-handler');
const browserWindow = require('./browser-window');

class App {
  constructor() {
    squirelStartupHandler.on('quit-app', () => {
      app.quit();
    });
    app.on('ready', this.ready);
  }

  ready() {
    app.setName('Jouley');
    browserWindow.createWindow('main', 'index');
  }
}

module.exports = new App();
