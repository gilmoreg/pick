const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);

module.exports = app;