const Model = require('../model');
class UserModel extends Model {
  constructor(req) {
    super(req);

    this.start = req.query?.start ?? 0;
    this.end = req.query?.end ?? 15;
    this.keyword = req.query?.keyword ?? '';
  }

  async read(res) {
    const user = await this.dao.serialize(async db => {
      const metadata = await db.get('select count(*) as lastEnd from user where user.name like ?', [
        `%${this.keyword}%`
      ]);
      const lastEnd = metadata[0].lastEnd;
      const users = await db.get('select distinct user.id, user.name from user where user.name like ? limit ?,?', [
        `%${this.keyword}%`, this.start, this.end
      ]);
      res.json({
        users,
        requestEnd: this.end,
        lastEnd: metadata[0].lastEnd
      });
    });
  }
}
module.exports = UserModel;
