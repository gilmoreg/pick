const path = require('path');
const Koa = require('koa');
const pug = require('js-koa-pug');
const router = require('./routes');

const app = new Koa();

app
  // Log all requests with response time
  .use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method}: ${ctx.url || ''} - ${ms}ms`);
  })
  // Serve static files
  .use(require('koa-static')(path.join(__dirname, 'public')))
  // Load pug (with cache enabled in prod)
  .use(pug('views', { cache: (process.env.NODE_ENV === 'production') }))
  // Load routes
  .use(router.routes())
  .use(router.allowedMethods());

// Log development errors
app.on('error', (err, ctx) => console.error('server error', err, ctx || null));

// TODO log production errors

if (!module.parent) {
  app.listen(3000);
  console.log('Koa is listening on port 3000');
}

module.exports = app;