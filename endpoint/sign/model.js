const Model = require('../model');
const env = require('../../loadModules').env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
function createToken(payload) {
  return jwt.sign({
    ...payload,
    iss: 'jebong'
  }, 'development', {
    algorithm: 'HS256'
  });
}
function createTokens(id) {
  const iat = Date.now() / 1000;
  const exp = iat + 60 * 60 * 2;
  const maxAge = iat + exp * 2 * 1000;
  const accessToken = createToken({
    id, iat, exp
  });
  const refreshToken = createToken({
    id, iat,
    exp: exp * 2
  });
  return {
    accessToken,
    refreshToken,
    maxAge
  }
}
function verifyToken(token) {
  const payload = jwt.verify(token, 'development', {
    algorithms: ['HS256']
  });
  return payload.id;
}

class SignModel extends Model {
  constructor(req) {
    super(req);

    this.email = req.body.email;
    this.password = req.body.password;
    this.oldRefreshToken = req.cookie?.refreshToken;
  }

  async create(res) {

    // DB에 연결하여 사용자 정보 취득
    const user = await this.dao.serialize(async db => {
      const users = await db.get('select user.id, user.password from user where user.email=?', [
        this.email
      ]);
      if(!users.length) {
        throw new Error('인증 실패');
      }
      const user = users[0];
      return user;
    });

    // 비밀번호 확인
    if(await bcrypt.compare(this.password, user.password)) {
      const {
        accessToken,
        refreshToken,
        maxAge
      } = createTokens(user.id);
      res.cookie('refreshToken', refreshToken, {
        maxAge,
        secure: env.HTTPS,
        httpOnly: true
      });
      res.json({
        accessToken
      });
    } else {
      throw new Error('인증 실패.');
    }


    /*
    return this.query('select user.id, user.password from user where user.email=?', [

    ])(async result => {
      if(!result.rows.length) {

      }
      const user = result.rows[0];
      if(await bcrypt.compare(this.password, user.password)) {
        const {
          accessToken,
          refreshToken,
          maxAge
        } = createTokens(user.id);
        res.cookie('refreshToken', refreshToken, {
          maxAge,
          secure: env.HTTPS,
          httpOnly: true
        });
        res.json({
          accessToken
        });
      } else {
        throw new Error('인증 실패.');
      }
    })();
    */
  }

  async read(res) {
    try {
      const id = verifyToken(this.oldRefreshToken);
    } catch(err) {
      throw new Error('403 유효하지 않은 인증.');
    }
    const {
      accessToken,
      refreshToken,
      maxAge
    } = createTokens(user.id);
    res.cookie('refreshToken', refreshToken, {
      maxAge,
      secure: env.HTTPS,
      httpOnly: true
    });
    res.json({
      accessToken
    });
  }
}
module.exports = SignModel;
