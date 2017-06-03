const path = require('path');
const Koa = require('koa');
const cors = require('kcors');
const pug = require('js-koa-pug');
const mongoose = require('mongoose');
const router = require('./routes');

const app = new Koa();
mongoose.Promise = global.Promise;

// Start up Mongoose
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/pick');
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose error: ${err.message}`);
});

// Add middleware
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
  .use(router.allowedMethods())
  // CORS
  .use(cors);

// Log development errors
app.on('error', (err, ctx) => console.error('server error', err, ctx || null));

// TODO log production errors

// Start server
if (!module.parent) {
  app.listen(3000);
  console.log('Koa is listening on port 3000');
}

module.exports = app;
