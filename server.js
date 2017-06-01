const Koa = require('koa');

const app = new Koa();

app.use((ctx) => {
  ctx.body = 'Hello World';
});

// Log errors
app.on('error', (err, ctx) => console.error('server error', err, ctx || null));

if (!module.parent) app.listen(3000);

module.exports = app;
