const BoardDetailModel = require('../model');
class BoardDetailReplyModel extends BoardDetailModel {
  constructor(req) {
    super(req);
    this.content = req.body?.content;
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
    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
      const comments = await db.get('select boardReply.id as commentID, user.name, boardReply.content, boardReply.createdAt from boardReply left join user on boardReply.userId=user.id where boardReply.boardId=?', [
        this.boardId
      ]);
      res.json({
        comments
      });
    });
  }
}
module.exports = BoardDetailReplyModel;
