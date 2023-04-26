const bodyParser = require('body-parser');

/**
 * Function to use the body-parser middleware
 * @param {object} app
 */
function useBodyParser(app) {
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
}

module.exports = {
  useBodyParser: useBodyParser,
};
