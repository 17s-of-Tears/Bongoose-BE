const UserDetailModel = require('./model');

module.exports = {
  Read(req, res, next) {
    const dao = new UserDetailModel(req);
    dao.read(res).catch(err => next(err));
  }
};
