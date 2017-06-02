const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.Promise = global.Promise;

const pollSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Please supply a username',
  },
  list: [
    {
      anime: { type: mongoose.Schema.ObjectId, ref: 'Anime' },
      votes: [
        // Stored as a list of IP addresses
        {
          type: String,
          trim: true,
          unique: 'You cannot vote twice on the same poll.',
        },
      ],
    },
  ],
});

// Index username for faster searching
pollSchema.index({ username: 1 });
// Make prettier error messages
pollSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Poll', pollSchema);
