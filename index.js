const path = require('path');
const fs = require('fs');
const loader = require('./loadModules').app;
const app = loader();
const ROOT = process.cwd();
const img = app('/img/*', {
  Read(req, res) {
    const dir = req.baseUrl;
    const file = req.path;
    res.sendFile(path.join(ROOT, dir, file));
  },
});
const api = app('/api/v1');
const user = api('/user');
user('/', require('./endpoint/user'));
user('/me', require('./endpoint/user/me'));
user('/random', require('./endpoint/user/random'));
user('/:userId', require('./endpoint/user/detail'));
user('/:userId/relation', require('./endpoint/user/detail/relation'));
const sign = api('/sign');
sign('/', require('./endpoint/sign'));
sign('/up', require('./endpoint/sign/up'));
const board = api('/board');
board('/', require('./endpoint/board'));
board('/rating', require('./endpoint/board/rating'));
board('/:boardId', require('./endpoint/board/detail'));
board('/:boardId/comment', require('./endpoint/board/detail/comment'));
board('/:boardId/comment/:commentId', require('./endpoint/board/detail/comment/detail'));
//board('/:boardId/image', require('./endpoint/board/detail/image'));
//board('/:boardId/image/:imageId', require('./endpoint/board/detail/image/detail'));
board('/:boardId/like', require('./endpoint/board/detail/like'));
const index = path.join(__dirname, 'front', 'index.html');
app('/*', {
  Read(req, res) {
    const file = req.path;
    const { dir, base } = path.parse(file);
    const target = path.join(__dirname, 'front', dir, base);
    if(fs.existsSync(target)) {
      res.sendFile(target);
    } else {
      res.sendFile(index);
    }
  }
});


const Model = require('./endpoint/model');
app.addErrorType(Model.Error400Parameter, {
  status: 400,
  message: 'INVALID_PARAMETER',
});
app.addErrorType(Model.Error400, {
  status: 400,
});
app.addErrorType(Model.Error401, {
  status: 401,
  message: 'UNAUTHORIZED',
});
app.addErrorType(Model.Error403, {
  status: 403,
  message: 'FORBIDDEN',
});
app.addErrorType(Model.Error404, {
  status: 404,
  message: 'NOT_FOUND',
});
app.addErrorType(Error, {
  status: 500,
});

if(process.env.HTTPS==='1') {
  const proto = app.getProto();
  const https = require('https');
  const fs = require('fs');
  const credentials = {
    key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
    cert: fs.readFileSync(process.env.SSL_CERT, 'utf8'),
  };
  const server = https.createServer(credentials, proto);
  server.listen(process.env.PORT ? process.env.PORT - 0 : 48000);
} else {
  app.listen(process.env.PORT ? process.env.PORT - 0 : 48000);
}
