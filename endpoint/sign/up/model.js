const SignModel = require('../model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
function createDefaultName() {
  const defaultHash = crypto.randomBytes(3).toString('hex');
  return `봉구${defaultHash}`;
}

class SignUpModel extends SignModel {
  constructor(req) {
    super(req);

    this.nickname = req.body.nickname ?? createDefaultName();
  }

  async create(res) {
    await this.dao.serialize(async db => {
      const users = await db.get('select user.name from user where user.email=?', [
        this.email
      ]);
      if(users.length) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      const passwordHash = await bcrypt.hash(this.password, 10);

      await db.run('insert into user(name, email, password) values (?, ?, ?)', [
        this.nickname, this.email, passwordHash
      ]);

      res.status(201);
      res.json({
        complete: true
      });
    });

    /*
    return this.query('select user.name from user where user.email=?', [
      email
    ])(async result => {
      if(result.rows.length) {

      }
      return {
        passwordHash:
      };
    })('insert into user(name, email, password) values (?, ?, ?)', storage => ([
      rage.passwordHash
    ]))(() => {

    })();
    */
  }
}
module.exports = SignUpModel;
