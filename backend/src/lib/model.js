const _ = require('lodash');
const Bluebird = require('bluebird');

const db = require('./db');
const QueryUtils = require('./query-utils');


class Model {
  /**
   * @constructor
   * @param {string} tableName Database table name.
   */
  constructor(tableName) {
    if (!tableName) {
      throw new Error('tableName is required to create a Model.');
    }

    this._tableName = tableName;
  }

  /**
   * Find Instancess matching the following properties supplied in |attributes|
   * in |this._tableName|, returning attributes defined by |selectAttributes|.
   *
   * @param {Array}  attributes       Instance attributes to filter by.
   * @param {Array}  selectAttributes Instance attributes to return in the
   *                                  query response.
   * @return {Promise} Resolved with the result of the query.
   */
  _find(attributes, selectAttributes) {
    if (!attributes) {
      return Bluebird.reject('attributes are required.');
    }

    const selectClause = QueryUtils.select(selectAttributes);

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    const whereClause = QueryUtils.where(attributes);

    const query = `${selectClause} FROM ${this._tableName} ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Find Query', query, params);

    return db.query(query, params)
      .then(result => result.rows);
  }

  /**
   * Create a Instances with the properties supplied in |attributes|.
   *
   * @param {Array} attributes Attributes to create a Instances with.
   * @param {Array=?} returnAttributes Instance attributes to return in the
   *                                   query response.
   * @return {Promise} Resolved with the result of the query.
   */
  _create(attributes, returnAttributes) {
    if (!attributes) {
      return Bluebird.reject('attributes are required.');
    }

    const returnClause = QueryUtils.returning(returnAttributes);

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    const valueClause = QueryUtils.values(attributes);

    const query =
      `INSERT INTO ${this._tableName}${valueClause} ${returnClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Insertion Query', query, params);

    return db.query(query, params)
      .then(result => result.rows[0]);
  }

  /**
   * Update Instances identified by |identifierAttributes| with the properties
   * supplied in |modifiedAttributes|.
   *
   * @param {Array} identifierAttributes Attributes to identify Instances with.
   * @param {Array} modifiedAttributes Attributes to modify Instances with.
   * @param {Array=?} returnAttributes Instance attributes to return in the
   *                                   query response.
   * @return {Promise} Resolved with the result of the query.
   */
  _update(identifierAttributes, modifiedAttributes, returnAttributes) {
    if (!identifierAttributes) {
      return Bluebird.reject('identifierAttributes is required.');
    }
    if (!modifiedAttributes) {
      return Bluebird.reject('modifiedAttributes is required.');
    }

    const returnClause = QueryUtils.returning(returnAttributes);

    // Remove attributes that have values that are either null or undefined.
    _.remove(
      modifiedAttributes,
      a => _.isNull(a.value) || _.isUndefined(a.value)
    );

    const setClause = QueryUtils.set(modifiedAttributes);
    const whereClause = QueryUtils.where(
      identifierAttributes,
      modifiedAttributes.length // Variable count offset
    );

    const query =
      `UPDATE ${this._tableName} ${setClause} ${whereClause} ${returnClause};`;

    const params = _.map(modifiedAttributes, a => a.value);

    // Append the values of all the identifierAttributes
    for (let i = 0; i < identifierAttributes.length; i++) {
      params.push(identifierAttributes[i].value);
    }

    console.log('Update Query', query, params);

    return db.query(query, params)
      .then(result => result.rows[0]);
  }

  /**
   * Delete Instances with the properties supplied in |attributes|.
   *
   * @param {Array} attributes Attributes to delete a Instances with.
   * @param {Array=?} returnAttributes Instance attributes to return in the
   *                                   query response.
   * @return {Promise} Resolved with the result of the query.
   */
  _delete(attributes, returnAttributes) {
    if (!attributes) {
      return Bluebird.reject('attributes are required.');
    }

    // Remove attributes that have values that are either null or undefined.
    _.remove(attributes, a => _.isNull(a.value) || _.isUndefined(a.value));

    const whereClause = QueryUtils.where(attributes);

    const query =
      `DELETE FROM ${this._tableName} ${whereClause};`;

    const params = _.map(attributes, a => a.value);

    console.log('Deletion Query', query, params);

    return db.query(query, params)
      .then(result => result.rows[0]);
  }
}


module.exports = Model;
