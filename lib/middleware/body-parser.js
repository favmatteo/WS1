const bodyParser = require('body-parser');

/**
 * Function to use the body-parser middleware
 * @param {object} app
 */
function useBodyParser(app) {
  app.use((req, res, next) => {
    if (req.path === '/api-docs/') {
      return next();
    } else {
      bodyParser.json()(req, res, next);
    }
  });
}

module.exports = {
  useBodyParser: useBodyParser,
};
