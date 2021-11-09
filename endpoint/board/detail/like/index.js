const BoardDetailLikeModel = require('./model');
module.exports = {
  Delete(req, res, next) {
    const dao = new BoardDetailLikeModel(req);
    dao.delete(res).catch(err => next(err));
  },
  Read(req, res, next) {
    const dao = new BoardDetailLikeModel(req);
    dao.read(res).catch(err => next(err));
  },
  Update(req, res, next) {
    const dao = new BoardDetailLikeModel(req);
    dao.update(res).catch(err => next(err));
  }
};
