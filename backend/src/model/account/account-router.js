const controller = require('./account-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:accountId')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findOne(...args));

module.exports = router;
