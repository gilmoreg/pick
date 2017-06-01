const router = require('koa-router')();
const malController = require('../controllers/mal');
const pollController = require('../controllers/poll');

const catchErrors = fn =>
  (ctx, next) =>
    fn(ctx, next).catch(next);

router.get('/', ctx => ctx.render('home'));
/*
router.get('/:name', catchErrors(pollController.poll));

router.get('/mal/check/:name', catchErrors(malController.check));
router.get('/mal/list/:name', catchErrors(malController.list));
*/
module.exports = { router, catchErrors };
