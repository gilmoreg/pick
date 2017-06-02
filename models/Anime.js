const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const animeSchema = mongoose.Schema({
  title: {
    type: String,
    required: 'You must supply a title.',
    trim: true,
  },
  id: {
    type: Number,
    required: 'You must supply an id.',
    unique: 'An anime already exists for that id.',
    trim: true,
  },
});

// Index id field for faster searching
animeSchema.index({ id: 1 });
// Make prettier error messages
animeSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Anime', animeSchema);
