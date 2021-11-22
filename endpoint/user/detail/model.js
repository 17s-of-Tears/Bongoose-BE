const UserModel = require('../model');
class UserDetailModel extends UserModel {
  constructor(req) {
    super(req);
    this.userId = req.params.userId - 0;
  }

  async read(res) {
    this.checkParameters(this.userId);
    await this.dao.serialize(async db => {
      const users = await db.get('select user.id, user.name, user.email, user.createdAt, user.modifiedAt, user.imageUrl, user.description from user where user.id=?', [
        this.userId
      ]);
      const user = users[0];
      if(!user) {
        throw new UserDetailModel.Error404();
      }

      const images = await db.get('select boardImage.id as imageId, boardImage.imageUrl, board.id as boardId from board left join boardImage on board.id=boardImage.boardId where board.userId=? and boardImage.boardId is not null order by board.createdAt desc limit 8', [
        this.userId
      ]);

      const relations = this.requestUserID ? await db.get('select count(*)>0 as subscribed from userRelation where userRelation.subscribeUserId=? and userRelation.publishUserId=?', [ this.requestUserID, this.userId ]) : false;
      res.json({
        ...user,
        images,
        subscribed: !! relations[0]?.subscribed,
      });
    });
  }
}
module.exports = UserDetailModel;
