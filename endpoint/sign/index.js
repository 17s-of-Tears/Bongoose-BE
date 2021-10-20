const SignModel = require('./model');

module.exports = {
  Create(req, res, next) {
    const dao = new SignModel(req);
    dao.create(res).catch(err => next(err));
  },
  Read(req, res, next) {
    const dao = new SignModel(req);
    dao.read(res).catch(err => next(err));
  }
};
