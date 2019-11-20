const { Publication } = require('../models/publication.js');

module.exports = function(app) {
  // routes
  app.get('/publications', async (req, res) => {
    // query params { limit, offset }
    const { limit, offset } = req.query;

    try {
      // call the list static method of the collection
      const publications = await Publication.list({
        limit: parseInt(limit) || 20,
        offset: parseInt(offset) || 0
      });

      // set the headers for json
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ publications }));
    } catch (err) {
      // handle the error
      res.status(err.status || 500).send({
        message: err.message,
        error: err
      });
    }
  });
};
