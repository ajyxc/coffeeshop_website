const Model = require('../../lib/model');


class CompanyModel extends Model {
  constructor() {
    super('Company');
  }

  /**
   * Find Companies matching the following properties:
   *  - companyId (unique)
   *  - name  (unique)
   *  - address
   *  - startDate
   *  - isActive
   *
   * @param values {Object} Company properties to filter by.
   * @return {Promise} Resolved with the result of the query.
   */
  find(values) {
    const attributes = [
      {
        name: 'companyId',
        type: 'integer',
        value: values.companyId
      }, {
        name: 'name',
        type: 'text',
        value: values.name
      }, {
        name: 'address',
        type: 'text',
        value: values.address
      }, {
        name: 'startDate',
        type: 'timestamp',
        value: values.startDate
      }, {
        name: 'isActive',
        type: 'boolean',
        value: values.isActive
      }
    ];

    return this._find(attributes);
  }

  /**
   * Create a Company with the following properties:
   *  - name  (unique)
   *  - address
   *  - startDate
   *  - isActive
   *
   * @param values {Object} Properties to create a Company with.
   * @return {Promise} Resolved with the result of the query.
   */
  create(values) {
    const attributes = [
      {
        name: 'name',
        type: 'text',
        value: values.name
      }, {
        name: 'address',
        type: 'text',
        value: values.address
      }, {
        name: 'startDate',
        type: 'timestamp',
        value: values.startDate
      }, {
        name: 'isActive',
        type: 'boolean',
        value: values.isActive
      }
    ];

    return this._create(attributes);
  }
}


module.exports = new CompanyModel();
