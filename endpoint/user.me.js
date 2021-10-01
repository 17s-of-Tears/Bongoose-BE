const maria = require('../loadModules').maria;
module.exports = {
  Read(req, res, next) {
    const id = req.user?.id;
    if(id===undefined) {
      throw new Error('401 Unauthorized (예정)');
    }
    const query = maria('query');
    query('select user.name, user.createdAt, user.modifiedAt, user.imageUrl from user where user.id=?', [
      id
    ])(result => {
      if(!result.rows.length) {
        throw new Error('???');
      }
      const user = result.rows[0];
      return {
        user
      };
    })('select boardImage.imageUrl, board.id from board left join boardImage on board.id=boardImage.boardId where board.userId=? and boardImage.boardId is not null order by board.createdAt desc limit 8', [
      id
    ])((result, storage) => {
      res.json({
        ...storage.user,
        images: result.rows
      });
    })().catch(err => next(err));
    /*

    */
    // 사용자의 최근 업로드 사진 8개
    // 사용자의 최근 업로드 글
  }
};
