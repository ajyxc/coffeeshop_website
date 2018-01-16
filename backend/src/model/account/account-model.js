const Model = require('../../lib/model');


class AccountModel extends Model {
  constructor() {
    super('Account');
  }

  /**
   * Find accounts matching the following properties:
   *
   * The following attributes are supported:
   *  - accountId {integer} Account ID (unique)
   *  - email {string} email address (unique)
   *  - name {string} Full name
   *  - isAdmin {boolean} Whether the user is a Comprio admin
   *
   * @param values {Object} Product properties to filter by.
   * @param internal {boolean} Whether to include the password hash.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values, internal) {
    // Do not include the password hash by default.
    // Explicitly checks for true to prevent accidental usage.
    internal = internal === true;

    const attributes = [{
      name: 'accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'email',
      type: 'text',
      value: values.email
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'isAdmin',
      type: 'boolean',
      value: values.isAdmin
    }];

    let selectAttributes;

    if (!internal) {
      // Includes the password hash
      selectAttributes = []; // evaluates to '*'
    } else {
      selectAttributes = ['accountId', 'email', 'name', 'isAdmin'];
    }

    return this._find(attributes, selectAttributes);
  }

  /**
   * Create a Account with the following properties:
   *  - email {string} email address (unique)
   *  - name {string} Full name
   *  - isAdmin {boolean} Whether the user is a Comprio admin
   *  - hash {text} Password hash
   *
   * @param values {Object} Properties to create a Account with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [{
      name: 'email',
      type: 'text',
      value: values.email
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'isAdmin',
      type: 'boolean',
      value: values.isAdmin
    }, {
      name: 'hash',
      type: 'text',
      value: values.hash
    }];

    // Excludes the password hash
    const returnAttributes = ['accountId', 'email', 'name', 'isAdmin'];

    return this._create(attributes, returnAttributes);
  }

  /**
   * Update a Account with the following properties:
   *  - accountId (required)
   *  - email {string} email address (unique)
   *  - name {string} Full name
   *  - isAdmin {boolean} Whether the user is a Comprio admin
   *
   * @param values {Object} Properties to modify a Account with.
   * @return {Promise} Resolved with the result of the query.
   */
  update(values) {
    if (!values || !values.accountId) {
      return Bluebird.reject(
        'accountId is required for updating a Account.'
      );
    }

    const modifiedAttributes = [{
      name: 'email',
      type: 'text',
      value: values.email
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'isAdmin',
      type: 'boolean',
      value: values.isAdmin
    }];

    const identifierAttributes = [{
      name: 'accountId',
      type: 'integer',
      value: values.accountId
    }];

    return this._update(identifierAttributes, modifiedAttributes);
  }
}


module.exports = new AccountModel();
