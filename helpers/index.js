// Various shared methods

exports.errResponse = (ctx, status, msg) => {
  ctx.status = status;
  ctx.body = { errors: [{ msg, status }] };
  return ctx;
};

