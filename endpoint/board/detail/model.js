const BoardModel = require('../model');
class BoardDetailModel extends BoardModel {
  constructor(req) {
    super(req);

    this.boardId = req.params?.boardId;

  }

  async checkBoardOwned(db) {
    const boards = await db.get('select board.userId=? as isOwned from board where board.id=?', [
      this.requestUserID, this.boardId
    ]);
    const board = boards[0];
    if(!board || !board.isOwned) {
      throw new BoardDetailModel.Error403();
    }
  }

  async removeImages(db, boardId) {
    const files = await db.get('select boardImage.id from boardImage where boardImage.boardId=?', [
      this.boardId
    ]);
    this.file.id = this.boardId;
    for(const file of files) {
      await this.file.deleteIntegrityAssurance(db, file.id);
    }
  }

  async delete(res) {
    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkBoardOwned(db);
      await this.removeImages(db);

      const result = await db.run('delete from board where board.id=? and board.userId=?', [
        this.boardId, this.requestUserID
      ]);
      if(!result.affectedRows) {
        throw new BoardDetailModel.Error403();
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
        throw new BoardDetailModel.Error404();
      }

      const hashtags = await db.get('select boardHashtag.hashtag from boardHashtag where boardHashtag.boardId=?', [
        this.boardId
      ]);
      const images = await db.get('select boardImage.id, boardImage.imageUrl from boardImage where boardImage.boardId=?', [
        this.boardId
      ]);
      const lod = await db.get('select sum(boardLike.likeOrDislike=1) as likes, sum(boardLike.likeOrDislike=0) as dislikes from boardLike where boardLike.boardId=?', [
        this.boardId
      ]);
      const likes = (lod[0].likes===null ? 0 : lod[0].likes);
      const dislikes = (lod[0].dislikes===null ? 0 : lod[0].dislikes);
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
    try {
      this.checkParameters(this.boardId, this.content);
      await this.dao.serialize(async db => {
        await this.checkAuthorized(db);
        await this.checkBoardOwned(db);

        const result = await db.run('update board set board.content=? where board.id=? and board.userId=?', [
          this.content, this.boardId, this.requestUserID
        ]);
        if(!result.affectedRows) {
          throw new BoardDetailModel.Error403();
        }

        // hashtag 덮어쓰기
        await db.run('delete from boardHashtag where boardHashtag.boardId=?', [
          this.boardId
        ]);

        // 프론트엔드 요청사항에 의해 덮어쓰기로 변경
        const nonDuplicateHashtags = this.checkDuplicateHashtags(this.hashtags);
        for(const hashtag of nonDuplicateHashtags) {
          await db.run('insert into boardHashtag(boardId, hashtag) values (?, ?)', [
            this.boardId, hashtag
          ]);
        }

        res.json({
          complete: true
        });

        await this.deleteImages(db);
        await this.insertImages(db, this.boardId);

        res.status(201);
        res.json({
          boardId
        });
      });
    } catch(err) {
      this.file && this.file.withdraw();
      throw err;
    }
  }
}
module.exports = BoardDetailModel;
