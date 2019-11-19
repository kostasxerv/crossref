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
  issn: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

/**
 * Validations
 */

PublicationSchema.path('doi').required(true, 'Publication doi cannot be blank');
PublicationSchema.path('title').required(
  true,
  'Publication body cannot be blank'
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

  list: function(options) {
    // const criteria = options.criteria || {};
    // const page = options.page || 0;
    // const limit = options.limit || 30;
    // return this.find(criteria)
    //   .populate('user', 'name username')
    //   .sort({ createdAt: -1 })
    //   .limit(limit)
    //   .skip(limit * page)
    //   .exec();
  }
};

mongoose.model('Publication', PublicationSchema);
