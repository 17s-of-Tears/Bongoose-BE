const BoardDetailModel = require('../model');
class BoardDetailLikeModel extends BoardDetailModel {
  constructor(req) {
    super(req);
    this.like = req.body?.like;
  }

  async checkAvailable(db) {
    const boards = await db.get('select * from board where board.id=?', [
      this.boardId
    ]);
    const board = boards[0];
    if(!board) {
      throw new Error('403 권한 없음');
    }
  }

  async checkExists(db) {
    const likes = await db.get('select * from boardLike where boardLike.boardId=? and boardLike.userId=?', [
      this.boardId, this.requestUserID
    ]);
    const like = likes[0];
    return (!!like);
  }

  async delete(res) {
    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkAvailable(db);
      await db.run('delete from boardLike where boardLike.boardId=? and boardLike.userId=?', [
        this.boardId, this.requestUserID
      ]);
      res.json({
        complete: true
      });
    });
  }

  async read(res) {
    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      const likes = await db.get('select boardLike.likeOrDislike from boardLike where boardLike.boardId=? and boardLike.userId=?', [
        this.boardId, this.requestUserID
      ]);
      const like = likes[0];
      if(!like) {
        res.json({
          like: null
        });
        return;
      }
      res.json({
        like: (!!like.likeOrDislike)
      });
    });
  }

  async update(res) {
    this.checkParameters(this.boardId, this.like);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkAvailable(db);
      let result = {};
      const like = (!!this.like) ? 1 : 0;
      if(await this.checkExists(db)) {
        result = await db.run('update boardLike set boardLike.likeOrDislike=? where boardLike.boardId=? and boardLike.userId=? limit 1', [
          like, this.boardId, this.requestUserID
        ]);
      } else {
        result = await db.run('insert into boardLike(likeOrDislike, boardId, userId) values (?, ?, ?)', [
          like, this.boardId, this.requestUserID
        ]);
      }
      if(!result.affectedRows) {
        throw new Error('403 권한 없음');
      }
      res.json({
        complete: true
      });
    });
  }
}
module.exports = BoardDetailLikeModel;
