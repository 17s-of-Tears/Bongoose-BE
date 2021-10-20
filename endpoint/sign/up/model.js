const SignModel = require('../model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uuidv4 = require('uuid').v4;
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

      const result = await db.run('insert into user(name, email, password) values (?, ?, ?)', [
        this.nickname, this.email, passwordHash
      ]);
      await db.run('insert into userState(id, fresh) values (?, ?)', [
        result.lastID, uuidv4()
      ]);

      res.status(201);
      res.json({
        complete: true
      });
    });
  }
}
module.exports = SignUpModel;
