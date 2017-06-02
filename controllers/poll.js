/*
What needs to happen here?

For just rendering a poll, we need an animelist; we get that from the *database*
*/
exports.poll = async (ctx) => {
  try {
    if (!ctx.params.name) {
      return ctx.render('home');
    }
    // get anime list from database, or return an error if it doesn't exist
    return ctx.render('poll', { user: ctx.params.name });
  } catch (err) {
    return ctx.throw(400, new Error('GET /:name failure'));
  }
};
