'use strict';
const {BrowserWindow} = require('electron');

class JouleyBrowserWindow {

  set windows(value) {
    this._windows = value;
  }

  get windows() {
    return this._windows || [];
  }

  createWindow(name, htmlPath) {
    // Create the browser window.
    this[`${name}Window`] = new BrowserWindow({width: 1024, height: 768, frame: false});
    // and load the 'name'.html.
    this[`${name}Window`].loadURL(`file://${__dirname.replace('scripts', '')}${htmlPath}.html`);
    // Add to windows array
    this.windows.push(this.mainWindow);
    // Emitted when the window is closed.
    this[`${name}Window`].on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.windows[this.windows.indexOf(this[`${name}Window`])] = null;
      this[`${name}Window`] = null;
    });
  }
}

module.exports = new JouleyBrowserWindow();
