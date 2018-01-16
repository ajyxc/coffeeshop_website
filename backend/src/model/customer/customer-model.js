const _ = require('lodash');
const Bluebird = require('bluebird');

const db = require('../../lib/db');
const Model = require('../../lib/model');
const QueryUtils = require('../../lib/query-utils');


class CustomerModel extends Model {
  constructor() {
    super('Customer');
  }

  /**
   * Find Customers matching the following properties:
   *
   * The following attributes are supported:
   *  - accountId
   *  - companyId
   *  - points
   *
   * (accountId, companyId) is unique.
   *
   * @param values {Object} Customer properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values) {
    const attributes = [{
      name: 'accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'points',
      type: 'integer',
      value: values.points
    }];

    return this._find(attributes);
  }

  /**
   * Find Customers matching the following properties and join them on their
   * Account records.
   *
   * The following attributes are supported:
   *  - accountId
   *  - companyId
   *  - isManager
   *  - isActive
   *
   * (accountId, companyId) is unique.
   *
   * @param values {Object} Customer properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  accounts(values) {
    const attributes = [{
      name: 'e.accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'e.companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'e.isManager',
      type: 'boolean',
      value: values.isManager
    }, {
      name: 'e.isActive',
      type: 'boolean',
      value: values.isActive
    }];

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    let whereClause = QueryUtils.where(attributes);

    whereClause += whereClause ? ' AND ' : 'WHERE ';

    whereClause += 'a.accountId = e.accountId';

    const query = `SELECT * FROM Account a, Customer e ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Find Customers matching the following properties and join them on their
   * Company records.
   *
   * The following attributes are supported:
   *  - accountId
   *  - companyId
   *  - isManager
   *  - isActive
   *
   * (accountId, companyId) is unique.
   *
   * @param values {Object} Customer properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  companies(values) {
    const attributes = [{
      name: 'e.accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'e.companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'e.isManager',
      type: 'boolean',
      value: values.isManager
    }, {
      name: 'e.isActive',
      type: 'boolean',
      value: values.isActive
    }];

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    let whereClause = QueryUtils.where(attributes);

    whereClause += whereClause ? ' AND ' : 'WHERE ';

    whereClause += 'c.companyId = e.companyId';

    const query = `SELECT * FROM Company c, Customer e ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Create a Customer with the following properties:
   *  - accountId (required)
   *  - companyId (required)
   *  - points
   *
   * (accountId, companyId) is unique.
   *
   * @param values {Object} Properties to create a Customer with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [{
      name: 'accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'points',
      type: 'integer',
      value: values.points
    }];

    return this._create(attributes);
  }

  /**
   * Update a Customer with the following properties:
   *  - accountId (required)
   *  - companyId (required)
   *  - points
   *
   * (accountId, companyId) is unique.
   *
   * @param values {Object} Properties to modify a Customer with.
   * @return {Promise} Resolved with the result of the query.
   */
  update(values) {
    if (!values || !values.accountId || !values.companyId) {
      return Bluebird.reject(
        'accountId and companyId are required for updating a Customer.'
      );
    }

    const modifiedAttributes = [{
      name: 'points',
      type: 'integer',
      value: values.points
    }];

    const identifierAttributes = [{
      name: 'accountId',
      type: 'integer',
      value: values.accountId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }];

    return this._update(identifierAttributes, modifiedAttributes);
  }
}


module.exports = new CustomerModel();
