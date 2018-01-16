const controller = require('./purchaseitem-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/products')
  .get((...args) => controller.products(...args));

router.route('/:purchaseId/:productId')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findOne(...args))
  .delete((...args) => controller.delete(...args));

module.exports = router;
