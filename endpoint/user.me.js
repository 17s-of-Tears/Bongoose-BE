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
      res.json(user);
    })().catch(err => next(err));

  }
};
