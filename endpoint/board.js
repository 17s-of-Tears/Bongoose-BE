const maria = require('../loadModules').maria;
module.exports = {
  Create(req, res, next) {
    const userId = req.user?.id;
    if(userId===undefined) {
      throw new Error('401 Unauthorized (예정)');
    }
    const content = req.body?.content;
    const hashtags = req.body?.hashtags ?? [];
    const images = req.body?.images ?? [];
    if(content===undefined) {
      throw new Error('400 파라미터 오류(예정)');
    }
    const query = maria('query');
    query('insert into board(userId, content) values (?, ?)', [
      userId, content
    ])(result => {
      const boardId = result.lastID;
      if(!boardId) {
        throw new Error('???');
      }
      return {
        boardId
      };
    });
    for(const hashtag of hashtags) {
      query('insert into boardHashtag(boardId, hashtag) values (?, ?)', storage => ([
        storage.boardId, hashtag
      ]));
    }
    query((result, storage) => {
      res.status(201);
      res.json({
        boardId: storage.boardId
      });
    })().catch(err => next(err));
  },
  Read(req, res, next) {
    const start = req.query?.start ?? 0;
    const end = req.query?.end ?? 15;
    const keyword = req.query?.keyword ?? '';

    const query = maria('query');
    query('select count(distinct board.id) as lastEnd from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.name like ? or boardHashtag.hashtag like ?', [
      `%${keyword}%`, `%${keyword}%`
    ])(result => {
      return {
        lastEnd: result.rows[0].lastEnd
      };
    })('select distinct board.id, user.name as userName, board.content from board left join boardHashtag on board.id=boardHashtag.boardId left join user on board.userId=user.id where user.name like ? or boardHashtag.hashtag like ? limit ?,?', [
      `%${keyword}%`, `%${keyword}%`, start, end
    ])((result, storage) => {
      res.json({
        boards: result.rows,
        requestEnd: end,
        lastEnd: storage.lastEnd
      });
    })().catch(err => next(err));
  }
};
