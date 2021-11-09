const UserRelationModel = require('./model');

module.exports = {
  Delete(req, res, next) {
    const dao = new UserRelationModel(req);
    dao.delete(res).catch(err => next(err));
  },
  Update(req, res, next) {
    const dao = new UserRelationModel(req);
    dao.update(res).catch(err => next(err));
  }
};
