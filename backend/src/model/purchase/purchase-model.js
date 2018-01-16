const db = require('../../lib/db');
const Model = require('../../lib/model');

class PurchaseModel extends Model {
  constructor() {
    super('Purchase');
  }

  /**
   * Find Purchases matching the following properties:
   *
   * The following attributes are supported:
   *  - purchaseId (unique)
   *  - companyId
   *  - employeeId
   *  - customerId
   *
   * @param values {Object} Purchase properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values) {
    const attributes = [{
      name: 'purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'employeeId',
      type: 'integer',
      value: values.employeeId
    }, {
      name: 'customerId',
      type: 'integer',
      value: values.customerId
    }];

    return this._find(attributes);
  }

  /**
   * Find the product with the average price matching the following properties:
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
  findAvg(values) {
    const companyId = values.companyId;
    const query = `SELECT account.name ,  purchasedItemCounts.cnt/purchasesCounts.cnt as average
FROM
(SELECT customerId, COUNT(productId) as cnt
FROM purchase, purchaseItem
WHERE purchase.purchaseId = purchaseItem.purchaseId
AND companyId = $1::integer
GROUP BY customerId) purchasedItemCounts,
(SELECT customerId, Count(*) as cnt
FROM purchase
WHERE companyId = $2::integer
GROUP BY  customerId) purchasesCounts,
account
WHERE  purchasedItemCounts.customerId = purchasesCounts.customerId
AND account.accountId = purchasedItemCounts.customerId;`;

    const params = [companyId, companyId];

    console.log('Find AVG Price Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }


  findMaxAvg(values) {
    const companyId = values.companyId;
    const query = `SELECT avgTable.name, avgTable.average FROM
    (SELECT account.name ,  purchasedItemCounts.cnt/purchasesCounts.cnt as average
FROM
(SELECT customerId, COUNT(productId) as cnt
FROM purchase, purchaseItem
WHERE purchase.purchaseId = purchaseItem.purchaseId
AND companyId = $1::integer
GROUP BY customerId) purchasedItemCounts,
(SELECT customerId, Count(*) as cnt
FROM purchase
WHERE companyId = $2::integer
GROUP BY  customerId) purchasesCounts,
account
WHERE  purchasedItemCounts.customerId = purchasesCounts.customerId
AND account.accountId = purchasedItemCounts.customerId) avgTable
ORDER BY avgTable.average DESC
LIMIT 1;`;

    const params = [companyId, companyId];

    console.log('Find Max AVG Price Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }


  findManiacBuyers(values) {
    const companyId = values.companyId;
    const query = `SELECT a.name, a.email
    FROM Purchase p, Account a, PurchaseItem pi
    WHERE p.companyId = $1::integer AND a.accountId = p.customerId AND pi.purchaseId = p.purchaseId
    GROUP BY a.accountId
    HAVING COUNT(DISTINCT pi.productId) = (SELECT COUNT(*)
    FROM Product
    WHERE companyId = $2::integer);`;


    const params = [companyId, companyId];

    console.log('Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Create a Purchase with the following properties:
   *  - companyId
   *  - employeeId
   *  - customerId
   *
   * TODO: Add PurchaseItem creation
   *
   * @param values {Object} Properties to create a Purchase with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [{
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'employeeId',
      type: 'integer',
      value: values.employeeId
    }, {
      name: 'customerId',
      type: 'integer',
      value: values.customerId
    }];

    return this._create(attributes);
  }

  /**
   * Delete Purchases matching the following properties:
   *
   * The following attributes are supported:
   *  - purchaseId (unique)
   *  - companyId
   *  - employeeId
   *  - customerId
   *
   * @param values {Object} Purchase properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  delete(values) {
    const attributes = [{
      name: 'purchaseId',
      type: 'integer',
      value: values.purchaseId
    }, {
      name: 'companyId',
      type: 'integer',
      value: values.companyId
    }, {
      name: 'employeeId',
      type: 'integer',
      value: values.employeeId
    }, {
      name: 'customerId',
      type: 'integer',
      value: values.customerId
    }];

    return this._delete(attributes);
  }
}


module.exports = new PurchaseModel();
