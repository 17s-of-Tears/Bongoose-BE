const app = require('./loadModules').app;

const api = app('/api/v1');
api('/', {
  Read(req, res) {
    res.send('test');
  }
});
app.listen(3000);
