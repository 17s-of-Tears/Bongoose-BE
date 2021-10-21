const BoardDetailImageDetailModel = require('./model');
module.exports = {
  Delete(req, res, next) {
    const dao = new BoardDetailImageDetailModel(req);
    dao.delete(res).catch(err => next(err));
  },
};
