const Controller = require('../../lib/controller');
const EmployeeModel = require('./employee-model');


class EmployeeController extends Controller {
  constructor() {
    super('Employee');
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

    EmployeeModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such Employee exists.');
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
      isManager: req.query.isManager,
      isActive: req.query.isActive
    };

    this._handleResult(res, EmployeeModel.find(attributes));
  }

  accounts(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      isManager: req.query.isManager,
      isActive: req.query.isActive
    };

    this._handleResult(res, EmployeeModel.accounts(attributes));
  }

  companies(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      isManager: req.query.isManager,
      isActive: req.query.isActive
    };

    this._handleResult(res, EmployeeModel.companies(attributes));
  }

  /**
   * Create a Employee.
   */
  create(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      companyId: req.query.companyId,
      isManager: req.query.isManager,
      isActive: req.query.isActive
    };

    if (!attributes.accountId || !attributes.companyId) {
      res.status(400).send('A accountId and companyId are required.');
      return;
    }

    this._handleResult(res, EmployeeModel.create(attributes));
  }

  /**
   * Update a Employee using its IDs.
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

    this._handleResult(res, EmployeeModel.update(attributes));
  }
}


module.exports = new EmployeeController(EmployeeModel);
