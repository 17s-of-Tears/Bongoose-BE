const UserModel = require('./model');

module.exports = {
  Read(req, res, next) {
    const dao = new UserModel(req);
    dao.read(res).catch(err => next(err));
  }
};
