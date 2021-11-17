const app = require('./loadModules').app;

const api = app('/api/v1');
const user = api('/user');
user('/', require('./endpoint/user'));
user('/me', require('./endpoint/user/me'));
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
board('/:boardId/image', require('./endpoint/board/detail/image'));
board('/:boardId/image/:imageId', require('./endpoint/board/detail/image/detail'));
board('/:boardId/like', require('./endpoint/board/detail/like'));
const friend = api('/friend');

app.addErrorType(Error, {
  status(err) {
    if(/^\d{1,5} .{1,}/.test(err.message)) {
      const code = /^(\d{1,5}) .{1,}/.exec(err.message);
      return code[1];
    } else {
      return 500;
    }
  }
});
app.listen(48100);
