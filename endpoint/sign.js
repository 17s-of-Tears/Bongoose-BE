const maria = require('../loadModules').maria;
const env = require('../loadModules').env;
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

module.exports = {
  Read(req, res, next) {
    const oldRefreshToken = req.cookie.refreshToken;
    try {
      const id = verifyToken(oldRefreshToken);
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
  },
  Create(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const query = maria('query');
    query('select user.id, user.password from user where user.email=?', [
      email
    ])(async result => {
      if(!result.rows.length) {
        throw new Error('인증 실패');
      }
      const user = result.rows[0];
      if(await bcrypt.compare(password, user.password)) {
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
    })().catch(err => next(err));
  }
};
