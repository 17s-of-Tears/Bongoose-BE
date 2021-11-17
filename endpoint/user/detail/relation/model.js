const UserDetailModel = require('../model');
class UserRelationModel extends UserDetailModel {
  constructor(req) {
    super(req);
    // 처음엔 차단 기능을 생각했습니다만 기획에도 없고 해서 일단 보류
    //this.block = req.body?.block;
  }

  async checkAvailable(db) {
    const users = await db.get('select * from user where user.id=?', [
      this.userId
    ]);
    const user = users[0];
    return (!!user);
  }

  async checkExists(db) {
    const relations = await db.get('select * from userRelation where userRelation.subscribeUserId=? and userRelation.publishUserId=?', [
      this.requestUserID, this.userId
    ]);
    const relation = relations[0];
    return (!!relation);
  }

  async delete(res) {
    this.checkParameters(this.userId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await db.run('delete from userRelation where userRelation.subscribeUserId=? and userRelation.publishUserId=?', [
        this.requestUserID, this.userId
      ]);
      res.json({
        complete: true
      });
    });
  }

  async update(res) {
    //this.checkParameters(this.userId, this.block);
    this.checkParameters(this.userId);
    await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      await this.checkAvailable(db);
      if(this.userId === this.requestUserID) {
        throw new Error('400 잘못된 사용자');
      }
      let result = {};
      const block = 0;
      //const block = (!!this.block) ? 1 : 0;
      if(await this.checkExists(db)) {
        result = await db.run('update userRelation set userRelation.isBlock=? where userRelation.subscribeUserId=? and userRelation.publishUserId=? limit 1', [
          block, this.requestUserID, this.userId
        ]);
      } else {
        result = await db.run('insert into userRelation(isBlock, subscribeUserId, publishUserId) values (?, ?, ?)', [
          block, this.requestUserID, this.userId
        ]);
      }
      if(!result.affectedRows) {
        throw new Error('400 잘못된 사용자');
      }
      res.json({
        complete: true
      });
    });
  }
}
module.exports = UserRelationModel;
