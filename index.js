const app = require('./loadModules').app;

const api = app('/api/v1');
const user = api('/user');
const sign = api('/sign');
user('/me', require('./endpoint/user.me.js'));
sign('/', require('./endpoint/sign.js'));
sign('/up', require('./endpoint/sign.up.js'));
app.listen(3000);
