const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
class FileSystem {
  constructor(id, file) {
    this.id = id;
    this.multiple = file instanceof Array;
    this.file = file;
  }

  rm(relativePath) {
    const target = path.join(cwd, relativePath);
    fs.existsSync(target) && fs.rmSync(target);
  }

  rename(oldPath, newPath) {
    fs.existsSync(oldPath) && fs.renameSync(oldPath, newPath);
  }
}
module.exports = FileSystem;
