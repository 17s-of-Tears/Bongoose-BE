const fs = require('fs');
const path = require('path');
const events = require('events');
const ROOT = process.cwd();
class FileSystem {
  constructor(id, file, dir) {
    this.id = id;
    this.multiple = file instanceof Array;
    this.file = file;
    this.dir = dir;
  }

  async commit(file, callback) {
    const tempPath = file.path;
    const newPath = path.join(ROOT, this.dir, file.filename);
    const serverPath = path.join(this.dir, file.filename);
    try {
      const R = fs.createReadStream(tempPath);
      const W = fs.createWriteStream(newPath);
      R.pipe(W);
      await events.once(W, 'finish');
      fs.existsSync(tempPath) && fs.rmSync(tempPath);
      await callback(serverPath);
    } catch(err) {
      //fs.existsSync(tempPath) && fs.rmSync(tempPath);
      //fs.existsSync(newPath) && fs.rmSync(newPath);
      this.withdraw();
      throw err;
    }
  }

  withdraw() {
    if(this.multiple) {
      for(const file of this.file) {
        fs.existsSync(file.path) && fs.rmSync(file.path);
      }
    } else {
      const file = this.file;
      fs.existsSync(file.path) && fs.rmSync(file.path);
    }
  }

  rm(relativePath) {
    const target = path.join(ROOT, relativePath);
    fs.existsSync(target) && fs.rmSync(target);
  }

  rename(oldPath, newPath) {
    fs.existsSync(oldPath) && fs.renameSync(oldPath, newPath);
  }
}
module.exports = FileSystem;
