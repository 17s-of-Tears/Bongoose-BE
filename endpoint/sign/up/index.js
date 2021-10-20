const SignUpModel = require('./model');

module.exports = {
  Create(req, res, next) {
    const dao = new SignUpModel(req);
    dao.create(res).catch(err => next(err));
  },
  Read(req, res, next) {
    const dao = new SignUpModel(req);
    dao.read(res).catch(err => next(err));
  }
};
