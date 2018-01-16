const _ = require('lodash');
const Bluebird = require('bluebird');

const db = require('../../lib/db');
const Model = require('../../lib/model');
const QueryUtils = require('../../lib/query-utils');


class ProductModel extends Model {
  constructor() {
    super('Product');
  }

  /**
   * Find Products matching the following properties:
   *
   * The following attributes are supported:
   *  - productId (unique)
   *  - companyId
   *  - name
   *  - description
   *  - price
   *  - pointsCost
   *  - calories
   *  - volume
   *  - weight
   *  - isFood
   *  - available
   *
   * @param values {Object} Product properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values) {
    const attributes = [{
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'description',
      type: 'text',
      value: values.description
    }, {
      name: 'price',
      type: 'money',
      value: values.price
    }, {
      name: 'pointsCost',
      type: 'integer',
      value: values.pointsCost
    }, {
      name: 'calories',
      type: 'integer',
      value: values.calories
    }, {
      name: 'volume',
      type: 'integer',
      value: values.volume
    }, {
      name: 'weight',
      type: 'integer',
      value: values.weight
    }, {
      name: 'isFood',
      type: 'boolean',
      value: values.isFood
    }, {
      name: 'available',
      type: 'boolean',
      value: values.available
    }];

    return this._find(attributes);
  }

  /**
   * Find the product with the max price matching the following properties:
   *
   * The following attributes are supported:
   *  - productId (unique)
   *  - companyId
   *  - name
   *  - description
   *  - price
   *  - pointsCost
   *  - calories
   *  - volume
   *  - weight
   *  - isFood
   *  - available
   *
   * @param values {Object} Product properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  findMax(values) {
    const attributes = [{
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'description',
      type: 'text',
      value: values.description
    }, {
      name: 'price',
      type: 'money',
      value: values.price
    }, {
      name: 'pointsCost',
      type: 'integer',
      value: values.pointsCost
    }, {
      name: 'calories',
      type: 'integer',
      value: values.calories
    }, {
      name: 'volume',
      type: 'integer',
      value: values.volume
    }, {
      name: 'weight',
      type: 'integer',
      value: values.weight
    }, {
      name: 'isFood',
      type: 'boolean',
      value: values.isFood
    }, {
      name: 'available',
      type: 'boolean',
      value: values.available
    }];

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    const whereClause = QueryUtils.where(attributes);

    const query = `SELECT MAX(price) FROM ${this._tableName} ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Find MAX Price Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }


  /**
   * Find the product with the max price matching the following properties:
   *
   * The following attributes are supported:
   *  - productId (unique)
   *  - companyId
   *  - name
   *  - description
   *  - price
   *  - pointsCost
   *  - calories
   *  - volume
   *  - weight
   *  - isFood
   *  - available
   *
   * @param values {Object} Product properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  findMin(values) {
    const attributes = [{
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'description',
      type: 'text',
      value: values.description
    }, {
      name: 'price',
      type: 'money',
      value: values.price
    }, {
      name: 'pointsCost',
      type: 'integer',
      value: values.pointsCost
    }, {
      name: 'calories',
      type: 'integer',
      value: values.calories
    }, {
      name: 'volume',
      type: 'integer',
      value: values.volume
    }, {
      name: 'weight',
      type: 'integer',
      value: values.weight
    }, {
      name: 'isFood',
      type: 'boolean',
      value: values.isFood
    }, {
      name: 'available',
      type: 'boolean',
      value: values.available
    }];

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    const whereClause = QueryUtils.where(attributes);

    const query = `SELECT MIN(price) FROM ${this._tableName} ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Find MIN Price Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Create a Product with the following properties:
   *  - companyId
   *  - name
   *  - description
   *  - price
   *  - pointsCost
   *  - calories
   *  - volume
   *  - weight
   *  - isFood
   *  - available
   *
   * @param values {Object} Properties to create a Product with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [{
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'description',
      type: 'text',
      value: values.description
    }, {
      name: 'price',
      type: 'money',
      value: values.price
    }, {
      name: 'pointsCost',
      type: 'integer',
      value: values.pointsCost
    }, {
      name: 'calories',
      type: 'integer',
      value: values.calories
    }, {
      name: 'volume',
      type: 'integer',
      value: values.volume
    }, {
      name: 'weight',
      type: 'integer',
      value: values.weight
    }, {
      name: 'isFood',
      type: 'boolean',
      value: values.isFood
    }, {
      name: 'available',
      type: 'boolean',
      value: values.available
    }];

    return this._create(attributes);
  }

  /**
   * Update a Product with the following properties:
   *  - productId (required & immutable) (unique)
   *  - companyId
   *  - name
   *  - description
   *  - price
   *  - pointsCost
   *  - calories
   *  - volume
   *  - weight
   *  - isFood
   *  - available
   *
   * @param values {Object} Properties to modify a Product with.
   * @return {Promise} Resolved with the result of the query.
   */
  update(values) {
    if (!values || !values.productId) {
      return Bluebird.reject('productId is required for updating a product.');
    }

    const modifiedAttributes = [{
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'name',
      type: 'text',
      value: values.name
    }, {
      name: 'description',
      type: 'text',
      value: values.description
    }, {
      name: 'price',
      type: 'money',
      value: values.price
    }, {
      name: 'pointsCost',
      type: 'integer',
      value: values.pointsCost
    }, {
      name: 'calories',
      type: 'integer',
      value: values.calories
    }, {
      name: 'volume',
      type: 'integer',
      value: values.volume
    }, {
      name: 'weight',
      type: 'integer',
      value: values.weight
    }, {
      name: 'isFood',
      type: 'boolean',
      value: values.isFood
    }, {
      name: 'available',
      type: 'boolean',
      value: values.available
    }];

    const identifierAttributes = [{
      name: 'productId',
      type: 'integer',
      value: values.productId
    }];

    return this._update(identifierAttributes, modifiedAttributes);
  }
}


module.exports = new ProductModel();
