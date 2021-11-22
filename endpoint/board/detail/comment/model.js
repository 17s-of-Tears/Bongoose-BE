const BoardDetailModel = require('../model');
class BoardDetailReplyModel extends BoardDetailModel {
  constructor(req) {
    super(req);
    this.content = req.body?.content;
    this.page = (req.query?.page ?? 1) - 0;
    this.pageSize = (req.query?.pageSize ?? 10) - 0;
  }

  async create(res) {
    this.checkParameters(this.boardId, this.content);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      const result = await db.run('insert into boardReply(boardId, userId, content) values (?, ?, ?)', [
        this.boardId, this.requestUserID, this.content
      ]);
      if(!result.affectedRows) {
        throw new Error('DB_ERROR');
      }
      res.status(201);
      res.json({
        complete: true
      });
    });
  }

  async read(res) {
    this.checkParameters(this.boardId, this.page, this.pageSize);
    await this.dao.serialize(async db => {
      const metadata = await db.get('select count(boardReply.id) as len from boardReply where boardReply.boardId=?', [
        this.boardId
      ]);
      const len = metadata[0].len;
      const comments = await db.get('select boardReply.id as commentID, user.name, user.email, user.imageUrl, boardReply.content, boardReply.createdAt from boardReply left join user on boardReply.userId=user.id where boardReply.boardId=? limit ?,?', [
        this.boardId, (this.page - 1) * this.pageSize, this.pageSize
      ]);
      const _meta = {
        page: {
          current: this.page,
          last: Math.ceil(len / this.pageSize),
        },
      };
      res.json({
        _meta,
        comments,
      });
    });
  }
}
module.exports = BoardDetailReplyModel;
