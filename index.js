const app = require('./loadModules').app;

const api = app('/api/v1');
const sign = api('/sign');
sign('/', require('./endpoint/sign.js'));
sign('/up', require('./endpoint/sign.up.js'));
app.listen(3000);
