const BoardRatingModel = require('./model');
module.exports = {
  Read(req, res, next) {
    const model = new BoardRatingModel(req);
    model.read(res).catch(err => next(err));
  },
};
