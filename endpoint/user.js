const maria = require('../loadModules').maria;
module.exports = {
  Read(req, res, next) {
    const start = req.query?.start ?? 0;
    const end = req.query?.end ?? 15;
    const keyword = req.query?.keyword ?? '';

    const query = maria('query');
    query('select count(*) as lastEnd from user where user.name like ?', [
      `%${keyword}%`
    ])(result => {
      return {
        lastEnd: result.rows[0].lastEnd
      };
    })('select distinct user.id, user.name from user where user.name like ? limit ?,?', [
      `%${keyword}%`, start, end
    ])((result, storage) => {
      res.json({
        users: result.rows,
        requestEnd: end,
        lastEnd: storage.lastEnd
      });
    })().catch(err => next(err));
  }
};
