'use-strict';
const {readFileSync, writeFileSync} = require('fs');

class LibraryController {

  get library() {
    return this._library || this.getLibrary();
  }

  getLibrary() {
    try {
      this._library = readFileSync('library.json', 'utf-8');
      return this._library;
    } catch (err) {
      writeFileSync('library.json', '[]');
      return [];
    }
  }
}

module.exports = new LibraryController();
