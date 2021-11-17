const BoardModel = require('../model');
class BoardRatingModel extends BoardModel {
  async read(res) {
    await this.dao.serialize(async db => {
      const rating = await db.get('select hashtag, count(*) as total from board inner join boardHashtag on board.id=boardHashtag.boardId where board.createdAt >= date_add(now(), interval - 7 day) group by hashtag order by total desc limit 3');
      res.json(rating);
    });
  }
}
module.exports = BoardRatingModel;
