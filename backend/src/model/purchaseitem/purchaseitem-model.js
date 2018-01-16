const _ = require('lodash');

const db = require('../../lib/db');
const Model = require('../../lib/model');
const QueryUtils = require('../../lib/query-utils');


class PurchaseItemModel extends Model {
  constructor() {
    super('PurchaseItem');
  }

  /**
   * Find PurchaseItems matching the following properties:
   *
   * The following attributes are supported:
   *  - purchaseId
   *  - productId
   *  - quantity
   *  - unitPrice
   *  - pointsUsed
   *
   * (purchaseId, productId) is unique
   *
   * @param values {Object} PurchaseItem properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values) {
    const attributes = [{
      name: 'purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'quantity',
      type: 'integer',
      value: values.quantity
    }, {
      name: 'unitPrice',
      type: 'integer',
      value: values.unitPrice
    }, {
      name: 'pointsUsed',
      type: 'integer',
      value: values.pointsUsed
    }];

    return this._find(attributes);
  }

  /**
   * Find PurchaseItems matching the following properties and join them on their
   * Product records.
   *
   * The following attributes are supported:
   *  - purchaseId
   *  - productId
   *  - quantity
   *  - unitPrice
   *  - pointsUsed
   *
   * (purchaseId, productId) is unique
   *
   * @param values {Object} PurchaseItems properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  products(values) {
    const attributes = [{
      name: 'pi.purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'pi.productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'pi.quantity',
      type: 'integer',
      value: values.quantity
    }, {
      name: 'pi.unitPrice',
      type: 'integer',
      value: values.unitPrice
    }, {
      name: 'pi.pointsUsed',
      type: 'integer',
      value: values.pointsUsed
    }];

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    let whereClause = QueryUtils.where(attributes);

    whereClause += whereClause ? ' AND ' : 'WHERE ';

    whereClause += 'p.productId = pi.productId';

    const query = `SELECT * FROM Product p, PurchaseItem pi ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Purchase Item + Product Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Create a PurchaseItem with the following properties:
   *  - purchaseId
   *  - productId
   *  - quantity
   *  - unitPrice
   *  - pointsUsed
   *
   * (purchaseId, productId) is unique
   *
   * @param values {Object} Properties to create a PurchaseItem with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [{
      name: 'purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'quantity',
      type: 'integer',
      value: values.quantity
    }, {
      name: 'unitPrice',
      type: 'integer',
      value: values.unitPrice
    }, {
      name: 'pointsUsed',
      type: 'integer',
      value: values.pointsUsed
    }];

    return this._create(attributes);
  }

  /**
   * Delete PurchaseItems with the following properties:
   *  - purchaseId
   *  - productId
   *  - quantity
   *  - unitPrice
   *  - pointsUsed
   *
   * (purchaseId, productId) is unique
   *
   * @param values {Object} Properties to delete a PurchaseItems with.
   * @return {Promise} Resolved with the result of the query.
   */
  delete(values) {
    const attributes = [{
      name: 'purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'productId',
      type: 'integer',
      value: values.productId
    }, {
      name: 'quantity',
      type: 'integer',
      value: values.quantity
    }, {
      name: 'unitPrice',
      type: 'integer',
      value: values.unitPrice
    }, {
      name: 'pointsUsed ',
      type: 'integer',
      value: values.pointsUsed
    }];

    return this._delete(attributes);
  }
}


module.exports = new PurchaseItemModel();
