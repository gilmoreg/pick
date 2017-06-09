const Poll = require('../models/Poll');
const { errResponse } = require('../helpers');

exports.createPoll = poll =>
  new Promise(async (resolve, reject) => {
    await Poll.findOneAndRemove({ user: poll.user });
    const { user, list } = poll;
    const created = new Date().getTime();
    Poll.create({ user, list, created })
    // Return only necessary data
    .then(res => ({ user: res.user, list: res.list }))
    .then(res => resolve(res))
    .catch(err => reject(err));
  });

exports.result = async (ctx) => {
  try {
    if (!ctx.params.name) {
      return ctx.render('home');
    }
    const { name: user } = ctx.params;
    let vote = null;
    // Get vote ID for this user out of the cookie if it exists
    if (ctx.cookie && ctx.cookie[user]) vote = ctx.cookie[user];
    // Get a poll from the database
    const poll = await Poll.findOne({ user }, { user: 1, list: 1, _id: 0 });
    if (poll) {
      // Sort votes on result page
      poll.list = poll.list.sort((a, b) => (a.votes < b.votes ? 1 : -1));
      return ctx.render('result', { user, poll, vote });
    }
    return ctx.render('home', { error: `Poll ${user} not found.` });
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name/result failure: ${err}`));
  }
};

exports.poll = async (ctx) => {
  try {
    if (!ctx.params.name) {
      return ctx.render('home');
    }
    const { name: user } = ctx.params;
    // Get a poll from the database
    const poll = await Poll.findOne({ user }, { user: 1, list: 1, _id: 0 });
    if (poll) {
      if (ctx.cookie && ctx.cookie[user]) {
        // This user already voted in this poll
        return ctx.render('result', { user, poll, vote: ctx.cookie[user] });
      }
      return ctx.render('poll', { user, poll });
    }
    return ctx.render('home', { error: `Poll ${user} not found.` });
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
      if (ctx.cookie && ctx.cookie[user]) {
        // This user already voted in this poll
        return ctx.render('result', { user, poll, vote: ctx.cookie[user] });
      }
      ctx.cookies.set(user, id, { httpOnly: false, expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) });
      ctx.status = 200;
      ctx.body = { user, id, poll };
      return ctx;
    }
    // Nothing found in the db
    return errResponse(ctx, 404, 'Poll not found');
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name/vote failure: ${err}`));
  }
};
