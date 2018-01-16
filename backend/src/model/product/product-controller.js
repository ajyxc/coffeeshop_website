const Controller = require('../../lib/controller');
const ProductModel = require('./product-model');


class ProductController extends Controller {
  constructor() {
    super('Product');
  }

  findOne(req, res) {
    const attributes = {
      productId: req.params.productId
    };

    ProductModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such product exists.');
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
      productId: req.query.productId,
      companyId: req.query.companyId,
      name: req.query.name,
      description: req.query.description,
      price: req.query.price,
      pointsCost: req.query.pointsCost,
      calories: req.query.calories,
      volume: req.query.volume,
      weight: req.query.weight,
      isFood: req.query.isFood,
      available: req.query.available
    };

    this._handleResult(res, ProductModel.find(attributes));
  }

  findMax(req, res) {
    const attributes = {
      productId: req.query.productId,
      companyId: req.query.companyId,
      name: req.query.name,
      description: req.query.description,
      price: req.query.price,
      pointsCost: req.query.pointsCost,
      calories: req.query.calories,
      volume: req.query.volume,
      weight: req.query.weight,
      isFood: req.query.isFood,
      available: req.query.available
    };

    this._handleResult(res, ProductModel.findMax(attributes));
  }

  findMin(req, res) {
    const attributes = {
      productId: req.query.productId,
      companyId: req.query.companyId,
      name: req.query.name,
      description: req.query.description,
      price: req.query.price,
      pointsCost: req.query.pointsCost,
      calories: req.query.calories,
      volume: req.query.volume,
      weight: req.query.weight,
      isFood: req.query.isFood,
      available: req.query.available
    };

    this._handleResult(res, ProductModel.findMin(attributes));
  }

  /**
   * Create a Product.
   */
  create(req, res) {
    const attributes = {
      companyId: req.body.companyId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      pointsCost: req.body.pointsCost,
      calories: req.body.calories,
      volume: req.body.volume,
      weight: req.body.weight,
      isFood: req.body.isFood,
      available: req.body.available
    };

    this._handleResult(res, ProductModel.create(attributes));
  }

  /**
   * Update a Product using its ID.
   */
  update(req, res) {
    const attributes = {
      // From url params
      productId: req.params.productId,
      // From request body
      companyId: req.body.companyId,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      pointsCost: req.body.pointsCost,
      calories: req.body.calories,
      volume: req.body.volume,
      weight: req.body.weight,
      isFood: req.body.isFood,
      available: req.body.available
    };

    if (!attributes.productId) {
      res.status(400).send('A productId is required');
      return;
    }

    this._handleResult(res, ProductModel.update(attributes));
  }
}


module.exports = new ProductController(ProductModel);
