const Model = require('../model');
class UserModel extends Model {
  constructor(req) {
    super(req);

    this.start = (req.query?.start ?? 0) - 0;
    this.end = (req.query?.end ?? 15) - 0;
    this.keyword = req.query?.keyword ?? '';
    this.mysubscribe = (!!(req.query?.mysubscribe - 0)) ?? false;
  }

  async fetchUsers(db) {
    const fetchOptions = [ `%${this.keyword}%`, this.start, this.end ];
    const meta = await db.get('select count(*) as lastEnd from user where user.name like ?', fetchOptions);
    const users = await db.get('select distinct user.id, user.email, user.name, user.imageUrl, user.description from user where user.name like ? limit ?,?', fetchOptions);
    return {
      users,
      lastEnd: meta[0].lastEnd,
    };
  }

  async fetchUsersWithoutMe(db) {
    await this.checkAuthorized(db);
    const fetchOptions = [ this.requestUserID, `%${this.keyword}%`, this.start, this.end ];
    const meta = await db.get('select count(*) as lastEnd from user where user.id <> ? and user.name like ?', fetchOptions);
    const users = await db.get('select distinct user.id, user.email, user.name, user.imageUrl, user.description from user where user.id <> ? and user.name like ? limit ?,?', fetchOptions);
    return {
      users,
      lastEnd: meta[0].lastEnd,
    };
  }

  async fetchSubscribedUsers(db) {
    await this.checkAuthorized(db);
    const fetchOptions = [ this.requestUserID, `%${this.keyword}%`, this.start, this.end ];
    const meta = await db.get('select count(*) as lastEnd from userRelation left join user on userRelation.publishUserId=user.id where userRelation.subscribeUserId=? and user.name like ?', fetchOptions);
    const users = await db.get('select distinct user.id, user.email, user.name, user.imageUrl, user.description from userRelation left join user on userRelation.publishUserId=user.id where userRelation.subscribeUserId=? and user.name like ? limit ?,?', fetchOptions);
    return {
      users,
      lastEnd: meta[0].lastEnd,
    };
  }

  async read(res) {
    await this.dao.serialize(async db => {
      let users = null;
      if(!!this.requestUserID) {
        if(this.mysubscribe) {
          users = await this.fetchSubscribedUsers(db);
        } else {
          users = await this.fetchUsersWithoutMe(db);
        }
      } else {
        users = await this.fetchUsers(db);
      }
      res.json({
        ...users,
        requestEnd: this.end,
      });
    });
  }
}
module.exports = UserModel;
