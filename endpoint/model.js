const DAO = require('../loadModules').DAO;
class Model {
  constructor(req) {
    this.dao = new DAO();
    //this.query = maria('query');
    this.requestUserID = req.user?.id;
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
