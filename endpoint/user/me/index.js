const UserDetailModel = require('./model');

module.exports = {
  Create(req, res, next) {
    const dao = new UserDetailModel(req);
    dao.create(res).catch(err => next(err));
  },
  Read(req, res, next) {
    const dao = new UserDetailModel(req);
    dao.read(res).catch(err => next(err));
  }
};
