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
const friend = api('/friend');

app.listen(48000);
