const DAO = require('../loadModules').DAO;
class Model {
  constructor(req) {
    this.dao = new DAO();
    //this.query = maria('query');
    this.requestUserID = req.user?.id;
    this.fresh = req.user?.fresh;
  }

  async checkAuthorized(db) {
    if(!this.fresh) {
      throw new Error('401 Unauthorized');
    }
    const users = await db.get('select fresh from userState where userState.id=?', [
      this.requestUserID
    ]);
    if(!users.length) {
      throw new Error('401 Unauthorized');
    }
    const user = users[0];
    if(user.fresh !== this.fresh) {
      throw new Error('401 Unauthorized');
    }

  }

  checkParameters() {
    for(const arg of arguments) {
      if(arg === undefined || arg === NaN) {
        throw new Error('400 파라미터 오류');
      }
    }
  }

  isAuthorized() {
    if(!this.requestUserID) {
      throw new Error('401 Unauthorized');
    }
    return this;
  }
}
module.exports = Model;
