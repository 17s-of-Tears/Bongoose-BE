const DAO = require('../loadModules').DAO;
const FileSystem = require('../loadModules').FileSystem;
class Error400 extends Error {}
class Error400Parameter extends Error {}
class Error401 extends Error {}
class Error403 extends Error {}
class Error404 extends Error {}

class Model {
  static Error400 = Error400;
  static Error400Parameter = Error400Parameter;
  static Error401 = Error401;
  static Error403 = Error403;
  static Error404 = Error404;
  constructor(req) {
    this.dao = new DAO();
    this.requestUserID = req.user?.id;
    this.fresh = req.user?.fresh;
    this.file = null;
  }

  useFilesystem(file, dir) {
    this.file = new FileSystem(file, dir);
  }

  async checkAuthorized(db) {
    if(!this.fresh) {
      throw new Error401();
    }
    const users = await db.get('select fresh from userState where userState.id=?', [
      this.requestUserID
    ]);
    if(!users.length) {
      throw new Error401();
    }
    const user = users[0];
    if(user.fresh !== this.fresh) {
      throw new Error401();
    }

  }

  checkParameters() {
    for(const arg of arguments) {
      if(arg === undefined || arg === NaN) {
        throw new Error400Parameter();
      }
    }
  }
}
module.exports = Model;
