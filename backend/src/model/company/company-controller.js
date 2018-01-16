const Controller = require('../../lib/controller');
const CompanyModel  = require('./company-model');


class CompanyController extends Controller {
  constructor() {
    super('Company');
  }

  /**
   * Retrieves a single company by its ID.
   */
  findOne(req, res) {
    const attributes = {
      companyId: req.params.companyId
    };

    CompanyModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such company exists.');
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
   * Retrieves companies by their properties.
   */
  find(req, res) {
    const attributes = {
      companyId: req.query.companyId,
      name: req.query.name,
      address: req.query.address,
      startDate: req.query.startDate,
      isActive: req.query.isActive
    };

    this._handleResult(res, CompanyModel.find(attributes));
  }

  /**
   * Create a company.
   */
  create(req, res) {
    const attributes = {
      name: req.body.name,
      address: req.body.address,
      startDate: req.body.startDate || new Date(),
      isActive: req.body.isActive
    };

    this._handleResult(res, CompanyModel.create(attributes));
  }
}


module.exports = new CompanyController(CompanyModel);
