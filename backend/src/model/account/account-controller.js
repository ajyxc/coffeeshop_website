const Bluebird = require('bluebird');
const bcrypt = Bluebird.promisifyAll(require('bcrypt'));

const Controller = require('../../lib/controller');
const AccountModel = require('./account-model');


class AccountController extends Controller {
  constructor() {
    super('Account');
  }

  /**
   * Retrieves a single account by its ID.
   * TODO: Add authentication for limiting the access of account details to:
   *  - account owner
   *  - manager
   *  - admin
   */
  findOne(req, res) {
    const attributes = {
      accountId: req.params.accountId
    };

    AccountModel.find(attributes)
      .then(result => {
        if (!result || !result.length) {
          res.status(404).send('No such account exists.');
          return;
        }
        res.json(result[0]);
      })
      .catch(err => {
        res.status(500).send('An unexpected error occurred.');
        console.error('An unexpected error occurred.', err);
      });
  }

  /**
   * Retrieves accounts by their properties.
   * TODO: Add authentication for limiting the access of account details to:
   *  - account owner
   *  - manager
   *  - admin
   */
  find(req, res) {
    const attributes = {
      accountId: req.query.accountId,
      email: req.query.email,
      name: req.query.name,
      isAdmin: req.query.isAdmin
    };

    this._handleResult(res, AccountModel.find(attributes));
  }

  /**
   * Creates an account, including salt and hash generation.
   * TODO: Add authentication for preventing logged in users from creating
   * accounts.
   */
  create(req, res) {
    const password = req.body.password;
    if (!password) {
      res.status(400).send('Password must not be empty.');
      return;
    }

    const saltRounds = 10;

    this._handleResult(res, bcrypt.hashAsync(password, saltRounds)
      .then(hash => {
        const attributes = {
          email: req.body.email,
          name: req.body.name,
          isAdmin: req.body.isAdmin,
          hash // ES6 shorthand
        };

        return AccountModel.create(attributes);
      }));
  }

  /**
   * Update an account by its properties.
   */
  update(req, res) {
    const attributes = {
      accountId: req.params.accountId,
      email: req.body.email,
      name: req.body.name,
      isAdmin: req.body.isAdmin
    };

    this._handleResult(res, AccountModel.update(attributes));
  }
}


module.exports = new AccountController(AccountModel);
