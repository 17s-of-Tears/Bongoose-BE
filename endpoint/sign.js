const maria = require('../loadModules').maria;
const bcrypt = require('bcrypt');
module.exports = {
  Create(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const query = maria('query');
    query('select user.name, user.password from user where user.email=?', [
      email
    ])(async result => {
      if(!result.rows.length) {
        throw new Error('인증 실패');
      }
      const user = result.rows[0];
      if(await bcrypt.compare(password, user.password)) {
        res.json({
          name: user.name
        });
      } else {
        throw new Error('인증 실패.');
      }
    })().catch(err => next(err));
  }

};
