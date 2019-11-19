/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Publication Schema
 */

const PublicationSchema = new Schema({
  doi: { type: String, trim: true },
  title: { type: String, trim: true },
  issn: [{ type: String, trim: true }],
  createdAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

PublicationSchema.path('doi').required(true, 'Publication doi cannot be blank');
PublicationSchema.path('title').required(
  true,
  'Publication title cannot be blank'
);
PublicationSchema.path('issn').required(
  true,
  'Publication issn cannot be blank'
);

/**
 * Statics
 */

PublicationSchema.statics = {
  /**
   * List publications
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
  Publication: mongoose.model('Publication', PublicationSchema)
};
