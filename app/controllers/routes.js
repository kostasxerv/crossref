const Article = require('mongoose').model('Article');

module.exports = function(app) {
  // routes
  app.get('/articles', async (req, res) => {
    // query params { limit, offset }
    const { limit, offset } = req.query;

    try {
      // call the list static method of the collection
      const articles = await Article.list({
        limit: parseInt(limit) || 20,
        offset: parseInt(offset) || 0
      });

      // set the headers for json
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ articles }));
    } catch (err) {
      // handle the error
      res.status(err.status || 500).send({
        message: err.message,
        error: err
      });
    }
  });
};
