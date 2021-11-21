const BoardDetailImageModel = require('./model');
module.exports = {
  Update(req, res, next) {
    const dao = new BoardDetailImageModel(req);
    dao.update(res).catch(err => next(err));
  },
};
