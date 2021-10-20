const UserDetailModel = require('./model');
const { middleware } = require('./file');
module.exports = {
  Read(req, res, next) {
    const dao = new UserDetailModel(req);
    dao.read(res).catch(err => next(err));
  },
  Update(req, res, next) {
    const dao = new UserDetailModel(req);
    dao.update(res).catch(err => next(err));
  },
  Middlewares: [ middleware ]
};
