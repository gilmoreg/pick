const router = require('koa-router')();
const malController = require('../controllers/mal');
const pollController = require('../controllers/poll');

router.get('/', ctx => ctx.render('home'));
router.get('/:name', pollController.poll);

router.get('/mal/check/:name', malController.check);
router.get('/mal/list/:name', malController.list);

module.exports = router;
