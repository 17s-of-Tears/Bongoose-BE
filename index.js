const app = require('./loadModules').app;

const api = app('/api/v1');
const user = api('/user');
user('/', require('./endpoint/user'))
user('/me', require('./endpoint/user/me'));
const sign = api('/sign');
sign('/', require('./endpoint/sign'));
sign('/up', require('./endpoint/sign/up'));
const board = api('/board');
board('/', require('./endpoint/board'));
board('/:boardId', require('./endpoint/board/detail'));
board('/:boardId/image', require('./endpoint/board/detail/image'));
board('/:boardId/image/:imageId', require('./endpoint/board/detail/image/detail'));
const friend = api('/friend');

app.addErrorType(Error, {
  status(err) {
    if(/^\d{1,5} .{1,}/.test(err.message)) {
      const code = /^(\d{1,5}) .{1,}/.exec(err.message);
      return code[1];
    } else {
      throw new Error();
    }
  }
});
app.listen(48000);
