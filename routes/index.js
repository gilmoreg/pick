const router = require('koa-router')();
const malController = require('../controllers/mal');
const pollController = require('../controllers/poll');

router.get('/', ctx => ctx.render('home'));
router.get('/:name/vote', pollController.vote);
router.get('/:name', pollController.poll);
router.get('/mal/list/', malController.list);

module.exports = router;
