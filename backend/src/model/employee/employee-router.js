const controller = require('./employee-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/accounts')
  .get((...args) => controller.accounts(...args));

router.route('/companies')
  .get((...args) => controller.companies(...args));

router.route('/:accountId/:companyId')
  .put((...args) => controller.update(...args))
  .post((...args) => controller.update(...args))
  .get((...args) => controller.findOne(...args));

module.exports = router;
