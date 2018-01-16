const Controller = require('../../lib/controller');
const PurchaseItemModel = require('./purchaseitem-model');


class PurchaseItemController extends Controller {
  constructor() {
    super('PurchaseItem');
  }

  /**
   * Retrieves a single purchase item by its IDs.
   */
  findOne(req, res) {
    const attributes = {
      purchaseId: req.params.purchaseId,
      productId: req.params.productId
    };

    PurchaseItemModel.find(attributes)
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

  /**
   * Retrieves purchase items by their properties.
   */
  find(req, res) {
    const attributes = {
      purchaseId: req.query.purchaseId,
      productId: req.query.productId,
      quantity: req.query.quantity,
      unitPrice: req.query.unitPrice,
      pointsUsed: req.query.pointsUsed
    };

    this._handleResult(res, PurchaseItemModel.find(attributes));
  }

  /**
   * Retrieves purchase items by their properties joined with their products.
   */
  products(req, res) {
    const attributes = {
      purchaseId: req.query.purchaseId,
      productId: req.query.productId,
      quantity: req.query.quantity,
      unitPrice: req.query.unitPrice,
      pointsUsed: req.query.pointsUsed
    };

    this._handleResult(res, PurchaseItemModel.products(attributes));
  }

  /**
   * Create a PurchaseItem.
   */
  create(req, res) {
    const attributes = {
      purchaseId: req.body.purchaseId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice,
      pointsUsed: req.body.pointsUsed
    };

    this._handleResult(res, PurchaseItemModel.create(attributes));
  }

  /**
   * Delete a single purchase by its ID.
   */
  delete(req, res) {
    const attributes = {
      purchaseId: req.params.purchaseId,
      productId: req.params.productId
    };

    PurchaseItemModel.delete(attributes)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(500).send('An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }
}


module.exports = new PurchaseItemController(PurchaseItemModel);
