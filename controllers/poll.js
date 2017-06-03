const Poll = require('../models/Poll');
/*
What needs to happen here?

For just rendering a poll, we need an animelist; we get that from the *database*
*/
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
      return ctx.render('poll', { poll });
    }
    return ctx.render('home'); // TODO with an error
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name failure: ${err}`));
  }
};

exports.vote = async (ctx) => {
  try {
    const { name: user } = ctx.params;
    const { id: vote } = ctx.request.query;

    const poll = await Poll.findOne({ user });

    ctx.body = { ip: ctx.request.ip, user, vote, poll };
    return ctx.body;
  } catch (err) {
    return ctx.throw(400, new Error(`GET /:name/vote failure: ${err}`));
  }
};
