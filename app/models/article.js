/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Article Schema
 */

const ArticleSchema = new Schema({
  doi: { type: String, trim: true },
  title: { type: String, trim: true },
  issn: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

ArticleSchema.path('doi').required(true, 'Article doi cannot be blank');
ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('issn').required(true, 'Article issn cannot be blank');

/**
 * Statics
 */

ArticleSchema.statics = {
  /**
   * List articles
   *
   * @param {Object} options
   * @api private
   */

  list: function({ limit, offset }) {
    return this.find()
      .select('doi title issn')
      .sort({ doi: 1 })
      .limit(limit)
      .skip(offset)
      .exec();
  }
};

module.exports = {
  Article: mongoose.model('Article', ArticleSchema)
};
