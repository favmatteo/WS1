const { app, port } = require('./lib/app');

app.listen(port, () => {
    console.log(`The Webservice is listening on port ${port}`);
})
