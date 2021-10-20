const Model = require('../model');
class BoardModel extends Model {
  constructor(req) {
    super(req);

    this.start = req.query?.start ?? 0;
    this.end = req.query?.end ?? 15;
    this.keyword = req.query?.keyword ?? '';

    this.content = req.body?.content;
    this.hashtags = req.body?.hashtags ?? [];
    this.images = req.body?.images ?? [];
  }

  async create(res) {
    this.isAuthorized();

    this.checkParameters(this.content);
    await this.dao.serialize(async db => {
      const result = await db.run('insert into board(userId, content) values (?, ?)', [
        this.requestUserID, this.content
      ]);
      const boardId = result.lastID;
      if(!boardId) {
        throw new Error('???');
      }

      for(const hashtag of this.hashtags) {
        await db.run('insert into boardHashtag(boardId, hashtag) values (?, ?)', [
          boardId, hashtag
        ]);
      }

      res.status(201);
      res.json({
        boardId
      });
    });
  }

  async read(res) {
    await this.dao.serialize(async db => {
      const metadata = await db.get('select count(distinct board.id) as lastEnd from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.name like ? or boardHashtag.hashtag like ?', [
        `%${this.keyword}%`, `%${this.keyword}%`
      ]);
      const lastEnd = metadata[0].lastEnd;
      const boards = await db.get('select distinct board.id, user.name as userName, board.content from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.name like ? or boardHashtag.hashtag like ? limit ?,?', [
        `%${this.keyword}%`, `%${this.keyword}%`, this.start, this.end
      ]);

      res.json({
        boards,
        requestEnd: this.end,
        lastEnd
      });
    });
  }
}
module.exports = BoardModel;
