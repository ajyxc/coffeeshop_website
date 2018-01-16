const Controller = require('../../lib/controller');
const CustomerModel = require('./customer-model');


class CustomerController extends Controller {
  constructor() {
    super('Customer');
  }

  findOne(req, res) {
    const attributes = {
      accountId: req.params.accountId,
      companyId: req.params.companyId
    };

    if (!attributes.accountId || !attributes.companyId) {
      res.status(400).send('A accountId and companyId are required.');
      return;
    }

    CustomerModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such Customer exists.');
          return;
        }
        res.json(result);
      })
      .catch(err => {
        res.status(500).send('An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }

  find(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      points: req.query.points
    };

    this._handleResult(res, CustomerModel.find(attributes));
  }

  accounts(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      points: req.query.points
    };

    this._handleResult(res, CustomerModel.accounts(attributes));
  }

  companies(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      points: req.query.points
    };

    this._handleResult(res, CustomerModel.companies(attributes));
  }

  /**
   * Create a Customer.
   */
  create(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      points: req.query.points
    };

    if (!attributes.accountId || !attributes.companyId) {
      res.status(400).send('A accountId and companyId are required.');
      return;
    }

    this._handleResult(res, CustomerModel.create(attributes));
  }

  /**
   * Update a Customer using its IDs.
   */
  update(req, res) {
    const attributes = {
      // From url params
      accountId: req.params.accountId,
      companyId: req.params.companyId,
      // From request body
      points: req.query.points
    };

    if (!attributes.accountId || !attributes.companyId) {
      res.status(400).send('A accountId and companyId are required.');
      return;
    }

    this._handleResult(res, CustomerModel.update(attributes));
  }
}


module.exports = new CustomerController(CustomerModel);
