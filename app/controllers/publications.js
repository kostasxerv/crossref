/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { wrap: async } = require('co');
const Publication = mongoose.model('Publication');

/**
 * List
 */
exports.index = async(function*(req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const _id = req.query.item;
  const limit = 15;
  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = { _id };

  const publications = yield Publication.list(options);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ publications }));
});

console.log('123');
