const { app, port } = require('./lib/app');

app.listen(port, () => {
    console.log(`The Webservice is listening on port ${port}`);
    const appServer = require('./lib/appServer');
    const db = require('./lib/DBConnection');

    // Middleware
    appServer.useBodyParser();
    db.isDBConnected();

    // Routes
    const invoice = require('./routes/invoices');
    const user = require('./routes/users');

    app.use("/invoice", invoice)
    app.use("/user", user);
})
