const maria = require('../loadModules').maria;
module.exports = {
  Delete(req, res, next) {
    const userId = req.user?.id;
    if(userId===undefined) {
      throw new Error('401 Unauthorized (예정)');
    }
    const boardId = req.params?.boardId;
    const query = maria('query');
    query('delete from board where board.id=? and board.userId=?', [
      boardId, userId
    ])(result => {
      if(!result.affectedRows) {
        throw new Error('403 권한 없음 예정');
      }
      res.json({
        boardId,
        complete: true
      });
    })().catch(err => next(err));
  },
  Read(req, res, next) {
    const userId = req.user?.id;
    if(userId===undefined) {
      throw new Error('401 Unauthorized (예정)');
    }
    const boardId = req.params?.boardId;
    const query = maria('query');
    query('select user.name, board.createdAt, board.content from board left join user on board.userId=user.id where board.id=?', [
      boardId
    ])(result => {
      if(!result.rows.length) {
        throw new Error('404 내용 없음 예정');
      }
      return {
        board: result.rows[0]
      };
    })('select boardHashtag.hashtag from boardHashtag where boardHashtag.boardId=?', [
      boardId
    ])(result => ({
      hashtags: result.rows
    }))('select boardImage.imageUrl from boardImage where boardImage.boardId=?', [
      boardId
    ])(result => ({
      images: result.rows
    }))('select count(boardLike.likeOrDislike=1) as likes, count(boardLike.likeOrDislike=0) as dislikes from boardLike where boardLike.boardId=?', [
      boardId
    ])(result => ({
      likes: result.rows[0].likes,
      dislikes: result.rows[0].dislikes
    }))('select count(*) as comments from boardReply where boardReply.boardId=?', [
      boardId
    ])(result => ({
      comments: result.rows[0].comments
    }))((result, storage) => {
      res.json({
        ...storage.board,
        hashtags: storage.hashtags,
        images: storage.images,
        likes: storage.likes,
        dislikes: storage.dislikes,
        comments: storage.comments
      });
    })().catch(err => next(err));
  },
  Update(req, res, next) {
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
  }
};
