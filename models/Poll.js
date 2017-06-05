const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const pollSchema = mongoose.Schema({
  user: {
    type: String,
    trim: true,
    required: 'Please supply a username',
  },
  list: [
    {
      _id: false,
      title: {
        type: String,
        required: 'You must supply a title.',
        trim: true,
      },
      id: {
        type: Number,
        required: 'You must supply an id.',
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      votes: Number,
    },
  ],
  created: { type: Number },
});

// Index username for faster searching
pollSchema.index({ user: 1 });

module.exports = mongoose.model('Poll', pollSchema);
