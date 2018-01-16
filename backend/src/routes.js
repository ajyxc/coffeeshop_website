const Router = require('express').Router;
const router = new Router();

const account  = require('./model/account/account-router');
const company  = require('./model/company/company-router');
const customer  = require('./model/customer/customer-router');
const employee  = require('./model/employee/employee-router');
const product  = require('./model/product/product-router');
const purchase  = require('./model/purchase/purchase-router');
const purchaseItem  = require('./model/purchaseitem/purchaseitem-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Comprio API 0.1.0' });
});

router.use('/account', account);
router.use('/company', company);
router.use('/customer', customer);
router.use('/employee', employee);
router.use('/product', product);
router.use('/purchase', purchase);
router.use('/purchaseitem', purchaseItem);


module.exports = router;
