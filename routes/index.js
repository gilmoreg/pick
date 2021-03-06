const router = require('koa-router')();
const koaBody = require('koa-body')();
const malController = require('../controllers/mal');
const pollController = require('../controllers/poll');

router.get('/', ctx => ctx.render('home'));
router.get('/:name/result', pollController.result);
router.post('/:name/vote', koaBody, pollController.vote);
router.get('/:name', pollController.poll);
router.post('/mal/create/', koaBody, malController.list);
router.use((ctx) => {
  const err = new Error('No routes matched');
  ctx.throw(err, 401);
});

module.exports = router;
