const BoardModel = require('../model');
class BoardDetailModel extends BoardModel {
  constructor(req) {
    super(req);

    this.boardId = req.params?.boardId;
    this.addHashtags = req.body?.addHashtags ?? [];
    this.deleteHashtags = req.body?.deleteHashtags ?? [];
  }

  async checkBoardOwned(db) {
    const boards = await db.get('select board.userId=? as isOwned from board where board.id=?', [
      this.requestUserID, this.boardId
    ]);
    const board = boards[0];
    if(!board || !board.isOwned) {
      throw new Error('403 권한 없음');
    }
  }

  async delete(res) {
    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkBoardOwned(db);
      const files = await db.get('select boardImage.id from boardImage where boardImage.boardId=?', [
        this.boardId
      ]);
      this.file.id = this.boardId;
      for(const file of files) {
        await this.file.deleteIntegrityAssurance(db, file.id);
      }

      const result = await db.run('delete from board where board.id=? and board.userId=?', [
        this.boardId, this.requestUserID
      ]);
      if(!result.affectedRows) {
        throw new Error('403 권한 없음 예정');
      }
      res.json({
        complete: true
      });
    });
  }

  async read(res) {
    await this.dao.serialize(async db => {
      const boards = await db.get('select user.name, board.createdAt, board.content from board left join user on board.userId=user.id where board.id=?', [
        this.boardId
      ]);
      const board = boards[0];
      if(!board) {
        throw new Error('404 내용 없음 예정');
      }

      const hashtags = await db.get('select boardHashtag.hashtag from boardHashtag where boardHashtag.boardId=?', [
        this.boardId
      ]);
      const images = await db.get('select boardImage.id, boardImage.imageUrl from boardImage where boardImage.boardId=?', [
        this.boardId
      ]);
      const lod = await db.get('select count(boardLike.likeOrDislike=1) as likes, count(boardLike.likeOrDislike=0) as dislikes from boardLike where boardLike.boardId=?', [
        this.boardId
      ]);
      const likes = lod[0].likse;
      const dislikes = lod[0].dislikes;
      const comments = (await db.get('select count(*) as comments from boardReply where boardReply.boardId=?', [
        this.boardId
      ]))[0].comments;

      res.json({
        ...board,
        hashtags,
        images,
        likes,
        dislikes,
        comments
      });
    });
  }

  async update(res) {
    this.checkParameters(this.boardId, this.content);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkBoardOwned(db);
      const result = await db.run('update board set board.content=? where board.id=? and board.userId=?', [
        this.content, this.boardId, this.requestUserID
      ]);
      if(!result.affectedRows) {
        throw new Error('403 권한 없음 예정');
      }

      const tags = (await db.get('select boardHashtag.hashtag from boardHashtag where boardHashtag.boardId=?', [
        this.boardId
      ])).map(row => row.hashtag);

      for(const hashtag of this.addHashtags) {
        console.log(hashtag, tags, tags.includes(hashtag));
        if(tags.includes(hashtag)) {
          continue;
        }
        await db.run('insert into boardHashtag(boardId, hashtag) values (?, ?)', [
          this.boardId, hashtag
        ]);
      }
      for(const hashtag of this.deleteHashtags) {
        if(!tags.includes(hashtag)) {
          continue;
        }
        await db.run('delete from boardHashtag where boardHashtag.boardId=? and boardHashtag.hashtag=?', [
          this.boardId, hashtag
        ]);
      }

      res.json({
        complete: true
      });
    });
  }
}
module.exports = BoardDetailModel;
