const Controller = require('../../lib/controller');
const PurchaseModel = require('./purchase-model');


class PurchaseController extends Controller {
  constructor() {
    super('Purchase');
  }

  /**
   * Retrieves a single purchase by its ID.
   */
  findOne(req, res) {
    const attributes = {
      purchaseId: req.params.purchaseId
    };

    PurchaseModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such purchase item exists.');
          return;
        }
        res.json(result);
      })
      .catch(err => {
        res.status(500).send('An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }


  findAvg(req, res) {
    const attributes = {
      companyId: req.params.companyId
    };

    this._handleResult(res, PurchaseModel.findAvg(attributes));
  }

  findMaxAvg(req, res) {
    const attributes = {
      companyId: req.params.companyId
    };

    this._handleResult(res, PurchaseModel.findMaxAvg(attributes));
  }


  /**
   * Retrieves purchases by their properties.
   */
  find(req, res) {
    const attributes = {
      purchaseId: req.query.purchaseId,
      companyId: req.query.companyId,
      employeeId: req.query.employeeId,
      customerId: req.query.customerId
    };

    this._handleResult(res, PurchaseModel.find(attributes));
  }

  /**
   * Create a Purchase.
   * TODO: Better errors for required fields.
   * TODO: We probably want ot create PurchaseItems here too.
   */
  create(req, res) {
    const attributes = {
      purchaseId: req.body.purchaseId,
      companyId: req.body.companyId,
      employeeId: req.body.employeeId,
      customerId: req.body.customerId
    };

    this._handleResult(res, PurchaseModel.create(attributes));
  }

  findManiacBuyers(req, res) {
    const attributes = {
      companyId: req.params.companyId
    };

    this._handleResult(res, PurchaseModel.findManiacBuyers(attributes));
  }

  /**
   * Delete a single purchase by its ID.
   */
  delete(req, res) {
    const attributes = {
      purchaseId: req.params.purchaseId
    };

    PurchaseModel.delete(attributes)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send('An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }
}


module.exports = new PurchaseController(PurchaseModel);
