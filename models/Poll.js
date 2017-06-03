const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

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
      votes: [
        // Stored as a list of IP addresses
        {
          _id: false,
          type: String,
          trim: true,
          unique: 'You cannot vote twice on the same poll.',
        },
      ],
    },
  ],
  created: { type: Number },
});

// Index username for faster searching
pollSchema.index({ user: 1 });
// Static method for returning a template-friendly list
/* pollSchema.virtual('votingList').get(function () { // eslint-disable-line func-names
  return this.user; // .map(a => ({ title: a.title, id: a.id, votes: a.votes.length }));
});*/

// Make prettier error messages
pollSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Poll', pollSchema);
