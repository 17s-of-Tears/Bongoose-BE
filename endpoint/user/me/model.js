const UserModel = require('../model');
class UserDetailModel extends UserModel {
  async read(res) {
    this.isAuthorized();

    //this.checkParameters(this.);
    await this.dao.serialize(async db => {
      const users = await db.get('select user.name, user.createdAt, user.modifiedAt, user.imageUrl from user where user.id=?', [
        this.requestUserID
      ]);
      if(!users.length) {
        throw new Error('???');
      }
      const user = users[0];

      const images = await db.get('select boardImage.imageUrl, board.id from board left join boardImage on board.id=boardImage.boardId where board.userId=? and boardImage.boardId is not null order by board.createdAt desc limit 8', [
        this.requestUserID
      ]);
      res.json({
        ...user,
        images
      });
    });
  }
}
module.exports = UserDetailModel;
