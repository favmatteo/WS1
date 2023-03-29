const { app } = require('./app');

const bodyParser = require('body-parser');

/**
 * @description This function that enable the use of the body-parser middleware.
 */
function useBodyParser() {
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
}

module.exports = {
    useBodyParser: useBodyParser,
}
