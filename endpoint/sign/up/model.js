const SignModel = require('../model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const uuidv4 = require('uuid').v4;
/*
   정규식 출처
   https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
*/
const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    this.checkParameters(this.email, this.password);
    if(!regex.test(this.email)) {
      throw new SignUpModel.Error400('INVALID_EMAIL');
    }
    await this.dao.serialize(async db => {
      const users = await db.get('select user.name from user where user.email=?', [
        this.email
      ]);
      if(users.length) {
        throw new SignUpModel.Error400('CONFLICT_EMAIL');
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
