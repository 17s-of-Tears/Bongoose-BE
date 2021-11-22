const UserRandomModel = require('./model');
module.exports = {
  Read(req, res, next) {
    new UserRandomModel(req).read(res).catch(err => next(err));
  }
};
