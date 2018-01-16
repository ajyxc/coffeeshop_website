const controller = require('./product-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/max')
  .get((...args) => controller.findMax(...args));

router.route('/min')
  .get((...args) => controller.findMin(...args));

router.route('/:productId')
  .put((...args) => controller.update(...args))
  .post((...args) => controller.update(...args))
  .get((...args) => controller.findOne(...args));

module.exports = router;
