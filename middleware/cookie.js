// Adapted from https://www.npmjs.com/package/koa-cookie
exports.cookieParser = (ctx, next) => {
  const cookieHeader = ctx.headers.cookie;
  ctx.cookie = {};
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    cookies.forEach((item) => {
      const crumbs = item.split('=');
      if (crumbs.length > 1) ctx.cookie[crumbs[0].trim()] = crumbs[1].trim();
    });
  }
  return next();
};
