const Poll = require('../models/Poll');
const { errResponse } = require('../helpers');

exports.createPoll = poll =>
  new Promise(async (resolve, reject) => {
    await Poll.findOneAndRemove({ user: poll.user });
    const { user, list } = poll;
    const created = new Date().getTime();
    Poll.create({ user, list, created })
    .then(res => resolve(res))
    .catch(err => reject(err));
  });


exports.poll = async (ctx) => {
  try {
    if (!ctx.params.name) {
      return ctx.render('home');
    }
    const { name: user } = ctx.params;
    // Get a poll from the database
    const poll = await Poll.findOne({ user }, { user: 1, list: 1, _id: 0 });
    if (poll) {
      poll.list = poll.list.sort((a, b) => (a.votes < b.votes ? 1 : -1));
      return ctx.render('poll', { user, poll });
    }
    return ctx.render('home'); // TODO with an error
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name failure: ${err}`));
  }
};

exports.vote = async (ctx) => {
  try {
    const { name: user } = ctx.params;
    const { id } = ctx.request.body;

    const poll = await Poll.update(
      { user, 'list.id': id },
      { $inc: { 'list.$.votes': 1 },
      });
    if (poll) {
      ctx.status = 200;
      ctx.body = { user, id, poll };
      return ctx.body;
    }
    // Nothing found in the db
    return errResponse(ctx, 404, 'Poll not found');
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name/vote failure: ${err}`));
  }
};
