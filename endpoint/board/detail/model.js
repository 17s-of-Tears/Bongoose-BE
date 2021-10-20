const BoardModel = require('../model');
class BoardDetailModel extends BoardModel {
  constructor(req) {
    super(req);

    this.boardId = req.params?.boardId;
  }

  async delete(res) {
    this.isAuthorized();

    this.checkParameters(this.boardId);
    await this.dao.serialize(async db => {
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
      if(!boards.length) {
        throw new Error('404 내용 없음 예정');
      }
      const board = boards[0];

      const hashtags = await db.get('select boardHashtag.hashtag from boardHashtag where boardHashtag.boardId=?', [
        this.boardId
      ]);
      const images = await db.get('select boardImage.imageUrl from boardImage where boardImage.boardId=?', [
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
    /*
    const userId = req.user?.id;
    if(userId===undefined) {
      throw new Error('401 Unauthorized (예정)');
    }
    const boardId = req.params?.boardId;
    const content = req.body?.content;
    const addHashtags = req.body?.addHashtags ?? [];
    const deleteHashtags = req.body?.deleteHashtags ?? [];
    if(content===undefined || boardId===undefined) {
      throw new Error('400 파라미터 오류(예정)');
    }
    const query = maria('query');
    query('update board set board.content=? where board.id=? and board.userId=?', [
      content, boardId, userId
    ])(result => {
      if(!result.affectedRows) {
        throw new Error('403 권한 없음 예정');
      }
    })
    for(const hashtag of addHashtags) {
      query('insert into boardHashtag(boardId, hashtag) values (?, ?)', [
        boardId, hashtag
      ]);
    }
    for(const hashtag of deleteHashtags) {
      query('delete from boardHashtag where boardHashtag.boardId=? and boardHashtag.hashtag=?', [
        boardId, hashtag
      ]);
    }
    query(() => {
      res.json({
        boardId,
        complete: true
      });
    })().catch(err => next(err));
    */
  }
}
module.exports = BoardDetailModel;
