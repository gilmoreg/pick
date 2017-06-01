exports.poll = (ctx) => {
  try {
    if (!ctx.params.name) {
      return ctx.render('home');
    }
    return ctx.render('poll', { user: ctx.params.name });
  } catch (err) {
    return ctx.throw(400, new Error('what happened?'));
  }
};