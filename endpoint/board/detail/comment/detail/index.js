const BoardDetailReplyDetailModel = require('./model');
module.exports = {
  Delete(req, res, next) {
    const dao = new BoardDetailReplyDetailModel(req);
    dao.delete(res).catch(err => next(err));
  },
  Update(req, res, next) {
    const dao = new BoardDetailReplyDetailModel(req);
    dao.update(res).catch(err => next(err));
  }
};
