const path = require('path');
const HOME = process.env.HOME;
const maria = require(path.join(HOME, 'pman/server/database'));
const app = require(path.join(HOME, 'pman/server/server'));
const env = require(path.join(HOME, 'pman/server/environment'));
const jwt = require(path.join(HOME, 'pman/server/jwt'));
const Error = require(path.join(HOME, 'pman/server/Types/Error'));

module.exports = {
  maria, app, env, jwt, Error
};
