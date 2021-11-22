const Model = require('../model');
const env = require('../../loadModules').env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid').v4;
function createToken(payload) {
  return jwt.sign({
    ...payload,
    iss: 'jebong'
  }, 'development', {
    algorithm: 'HS256'
  });
}
function createTokens(id, fresh) {
  const iat = Date.now() / 1000;
  const exp = iat + 60 * 60 * 2;
  const maxAge = iat + exp * 2 * 1000;
  const accessToken = createToken({
    id, iat, exp, fresh
  });
  const refreshToken = createToken({
    id, iat,
    exp: exp * 2,
    fresh
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
  return {
    id: payload?.id ?? null,
    fresh: payload?.fresh ?? null
  };
}

class SignModel extends Model {
  constructor(req) {
    super(req);

    this.email = req.body.email;
    this.password = req.body.password;
    this.oldRefreshToken = req.cookie?.refreshToken;
    this.newPassword = req.body.newPassword;
  }

  async create(res) {
    this.checkParameters(this.email, this.password);
    // DB에 연결하여 사용자 정보 취득
    const user = await this.dao.serialize(async db => {
      const users = await db.get('select user.id, userState.fresh, user.password from user left join userState on user.id=userState.id where user.email=?', [
        this.email
      ]);
      const user = users[0];
      if(!user) {
        throw new SignModel.Error403();
      }
      return user;
    });

    // 비밀번호 확인
    if(await bcrypt.compare(this.password, user.password)) {
      const {
        accessToken,
        refreshToken,
        maxAge
      } = createTokens(user.id, user.fresh);
      res.cookie('refreshToken', refreshToken, {
        maxAge,
        secure: env.HTTPS,
        httpOnly: true,
        sameSite: 'none',
      });
      res.json({
        accessToken
      });
    } else {
      throw new SignModel.Error403();
    }
  }

  async read(res) {
    try {
      const { id, fresh } = verifyToken(this.oldRefreshToken);
    } catch(err) {
      throw new SignModel.Error403();
    }
    const {
      accessToken,
      refreshToken,
      maxAge
    } = createTokens(user.id);
    res.cookie('refreshToken', refreshToken, {
      maxAge,
      secure: env.HTTPS,
      httpOnly: true,
      sameSite: 'none',
    });
    res.json({
      accessToken
    });
  }

  async update(res) {
    this.checkParameters(this.password, this.newPassword);
    if(this.password === this.newPassword) {
      throw new SignModel.Error400('CONFLICT_PASSWORD');
    }
    const user = await this.dao.serialize(async db => {
      await this.checkAuthorized(db);
      const users = await db.get('select user.id, userState.fresh, user.password from user left join userState on user.id=userState.id where user.id=?', [
        this.requestUserID
      ]);
      const user = users[0];
      if(!user) {
        throw new SignModel.Error403();
      }

      if(await bcrypt.compare(this.password, user.password)) {
        const fresh = uuidv4();
        const passwordHash = await bcrypt.hash(this.newPassword, 10);
        await db.run('update user left join userState on user.id=userState.id set user.password=?, userState.fresh=? where user.id=? limit 1', [
          passwordHash, fresh, this.requestUserID
        ]);
        return {
          id: user.id,
          fresh
        };
      } else {
        throw new SignModel.Error400('INVALID_PASSWORD');
      }
    });

    const {
      accessToken,
      refreshToken,
      maxAge
    } = createTokens(user.id, user.fresh);
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
