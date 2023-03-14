const { app } = require('./app');

const bodyParser = require('body-parser');

function useBodyParser() {
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
}

exports.useBodyParser = useBodyParser;