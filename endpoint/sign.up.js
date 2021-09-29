const maria = require('../loadModules').maria;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
function createDefaultName() {
  const defaultHash = crypto.randomBytes(3).toString('hex');
  return `봉구${defaultHash}`;
}

module.exports = {
  Create(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const defaultName = createDefaultName();
    const query = maria('query');
    query('select user.name from user where user.email=?', [
      email
    ])(async result => {
      if(result.rows.length) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      return {
        passwordHash: await bcrypt.hash(password, 10)
      };
    })('insert into user(name, email, password) values (?, ?, ?)', storage => ([
      defaultName, email, storage.passwordHash
    ]))(() => {
      res.status(201);
      res.json({
        complete: true
      });
    })().catch(err => next(err));
  }
};
