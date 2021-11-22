const UserModel = require('../model');
class UserRandomModel extends UserModel {
  async read(res) {
    await this.dao.serialize(async db => {
      let users = null;
      if(this.requestUserID) {
        await this.checkAuthorized(db);
        users = await db.get('select distinct user.id, user.email, user.name, user.imageUrl, user.description from user where user.id not in (select userRelation.publishUserId from userRelation where userRelation.subscribeUserId=?) order by rand() limit 3', [
          this.requestUserID
        ]);
      } else {
        users = await db.get('select distinct user.id, user.email, user.name, user.imageUrl, user.description from user order by rand() limit 3');
      }
      if(!users.length) {
        throw new UserRandomModel.Error404();
      }
      res.json(users);
    });
  }
}
module.exports = UserRandomModel;
