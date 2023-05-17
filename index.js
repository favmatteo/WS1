const { app, host, port } = require('./lib/app');

app.listen(port, host, () => {
  console.log(`The Webservice is listening on http://${host}:${port}`);
});
