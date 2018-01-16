const controller = require('./purchase-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/avg/:companyId')
  .get((...args) => controller.findAvg(...args));

router.route('/maxAvg/:companyId')
  .get((...args) => controller.findMaxAvg(...args));

router.route('/:purchaseId')
  // .put((...args) => controller.update(...args))
  .get((...args) => controller.findOne(...args))
  .delete((...args) => controller.delete(...args));

router.route('/top-buyers/:companyId')
  .get((...args) => controller.findManiacBuyers(...args));

module.exports = router;
