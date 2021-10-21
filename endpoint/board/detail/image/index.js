const BoardDetailImageDetailModel = require('./model');
module.exports = {
  Update(req, res, next) {
    const dao = new BoardDetailImageDetailModel(req);
    dao.delete(res).catch(err => next(err));
  },
};
