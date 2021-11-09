const BoardDetailReplyModel = require('../model');
class BoardDetailReplyDetailModel extends BoardDetailReplyModel {
  constructor(req) {
    super(req);
    this.commentId = req.params?.commentId;
  }

  async checkReplyOwned(db) {
    const replies = await db.get('select boardReply.userId=? as isOwned from boardReply where boardReply.boardId=? and boardReply.id=?', [
      this.requestUserID, this.boardId, this.commentId
    ]);
    const reply = replies[0];
    if(!reply || !reply.isOwned) {
      throw new Error('403 권한 없음');
    }
  }

  async delete(res) {
    this.checkParameters(this.boardId, this.commentId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkReplyOwned(db);
      const result = await db.run('delete from boardReply where boardReply.id=? limit 1', [
        this.commentId
      ]);
      if(!result.affectedRows) {
        throw new Error('403 권한 없음');
      }
      res.json({
        complete: true
      });
    });
  }

  async update(res) {
    this.checkParameters(this.boardId, this.content, this.commentId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkReplyOwned(db);
      const result = await db.run('update boardReply set boardReply.content=? where boardReply.id=? limit 1', [
        this.content, this.commentId
      ]);
      if(!result.affectedRows) {
        throw new Error('403 권한 없음');
      }
      res.json({
        complete: true
      });
    });
  }
}
module.exports = BoardDetailReplyDetailModel;
