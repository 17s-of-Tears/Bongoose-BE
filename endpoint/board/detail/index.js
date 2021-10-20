const BoardDetailModel = require('./model');

module.exports = {
  Delete(req, res, next) {
    const dao = new BoardDetailModel(req);
    dao.delete(res).catch(err => next(err));
  },
  Read(req, res, next) {
    const dao = new BoardDetailModel(req);
    dao.read(res).catch(err => next(err));
  },
  Update(req, res, next) {
    const dao = new BoardDetailModel(req);
    dao.update(res).catch(err => next(err));
  }
};
