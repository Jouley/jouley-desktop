'use-strict';
const EventEmitter = require('events');

class SquirrelStartupHandler extends EventEmitter {
  // this should be placed at top of main.js to handle setup events quickly
  constructor() {
    super();
    if (this.handleSquirrelEvent()) {
      // squirrel event handled and app will exit in 1000ms, so don't do anything else
      return;
    }
  }

  quitApp() {
    this.emit('quit-app');
  }

  handleSquirrelEvent() {
    if (process.argv.length === 1) {
      return false;
    }
    const ChildProcess = require('child_process');
    const path = require('path');
    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = (command, args) => {
      let spawnedProcess;

      try {
        spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
      } catch (error) {
        console.error(error);
      }

      return spawnedProcess;
    };

    const spawnUpdate = args => {
      return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
        // Optionally do things such as:
        // - Add your .exe to the PATH
        // - Write to the registry for things like file associations and
        //   explorer context menus

        // Install desktop and start menu shortcuts
        spawnUpdate(['--createShortcut', exeName]);

        setTimeout(this.quitApp.bind(this), 1000);
        return true;

      case '--squirrel-uninstall':
        // Undo anything you did in the --squirrel-install and
        // --squirrel-updated handlers

        // Remove desktop and start menu shortcuts
        spawnUpdate(['--removeShortcut', exeName]);

        setTimeout(this.quitApp.bind(this), 1000);
        return true;

      case '--squirrel-obsolete':
        // This is called on the outgoing version of your app before
        // we update to the new version - it's the opposite of
        // --squirrel-updated

        this.emit('quit-app');
        return true;
      default:
        return false;
    }
  }
}
module.exports = new SquirrelStartupHandler();
