/**
 * This module exposes sql query building utilities.
 */

class QueryUtils {
  /**
   * An sql 'SELECT' clause builder utility function.
   *
   * Examples:
   * QueryUtils.select(['id', 'name']); => 'SELECT id, name'
   * QueryUtils.select([]); => 'SELECT *'
   *
   * @param {array} attributes SELECT clause attributes with the format above.
   * @returns {string} A SELECT clause.
   */
  select(attributes) {
    return `SELECT ${this._list(attributes)}`;
  }

  /**
   * An sql 'RETURNING' clause builder utility function.
   *
   * Examples:
   * QueryUtils.select(['id', 'name']); => 'RETURNING id, name'
   * QueryUtils.select([]); => 'RETURNING *'
   *
   * @param {array} attributes RETURNING clause attributes with the format
   *                           above.
   * @returns {string} A RETURNING clause.
   */
  returning(attributes) {
    return `RETURNING ${this._list(attributes)}`;
  }

  /**
   * An sql 'WHERE' clause builder utility function.
   *
   * Example:
   *
   * call:
   *   QueryUtils.where([
   *     {
   *       name: 'id',
   *       type: 'integer'
   *     },
   *     {
   *       name: 'name',
   *       type: 'text'
   *     },
   *     {
   *       name: 'quantity',
   *       type: 'integer',
   *       operator: '<'
   *     }
   *   ]);
   *
   * returns:
   *   'WHERE id = $1::integer AND name = $2::text AND quantity < $3::integer'
   *
   * @param {array} attributes WHERE clause attributes with the format above.
   * @param {integer=?} offset Custom offset to use for variable numbers.
   *                           Normally starts at 1 (offset = 0).
   * @returns {string} A WHERE clause compatible with node-postgres.
   */
  where(attributes, offset) {
    if (!attributes || !attributes.length) {
      return '';
    }

    return `WHERE ${this._assignment(attributes, ' AND ', offset)}`;
  }

  /**
   * An sql 'SET' clause builder utility function.
   *
   * Example:
   *
   * call:
   *   QueryUtils.where([
   *     {
   *       name: 'id',
   *       type: 'integer'
   *     },
   *     {
   *       name: 'name',
   *       type: 'text'
   *     },
   *     {
   *       name: 'quantity',
   *       type: 'integer',
   *       operator: '<'
   *     }
   *   ]);
   *
   * returns:
   *   'SET id = $1::integer, name = $2::text, quantity < $3::integer'
   *
   * @param {array} attributes SET clause attributes with the format above.
   * @param {integer=?} offset Custom offset to use for variable numbers.
   *                           Normally starts at 1 (offset = 0).
   * @returns {string} A SET clause compatible with node-postgres.
   */
  set(attributes, offset) {
    if (!attributes || !attributes.length) {
      return '';
    }

    return `SET ${this._assignment(attributes, ', ', offset)}`;
  }

  /**
   * An sql 'VALUES' clause builder utility function.
   *
   * Example:
   *
   * call:
   *   QueryUtils.values([
   *     {
   *       name: 'name',
   *       type: 'text'
   *     },
   *     {
   *       name: 'quantity',
   *       type: 'integer'
   *     }
   *   ]);
   *
   * returns:
   *   '(name, quantity) VALUES ($1::text, $2::integer)'
   *
   * @param {array} attributes Values clause attributes with the format above.
   * @param {integer=?} offset Custom offset to use for variable numbers.
   *                           Normally starts at 1 (offset = 0).
   * @returns {string} A VALUES clause compatible with node-postgres.
   */
  values(attributes, offset) {
    if (!attributes || !attributes.length) {
      return '';
    }

    offset = (offset || 0) + 1;

    let first = '';
    let second = '';

    for (let i = 0; i < attributes.length; i++) {
      if (i !== 0) {
        first += ', ';
        second += ', ';
      }

      // Variable numbers
      const vNum = i + offset;

      first += attributes[i].name;
      second += `$${vNum}::${attributes[i].type}`;
    }

    return `(${first}) VALUES (${second})`;
  }

  /**
   * An assignment/equality sql clause builder utility function.
   *
   * Example:
   *
   * call:
   *   QueryUtils._assignment([
   *     {
   *       name: 'id',
   *       type: 'integer'
   *     },
   *     {
   *       name: 'name',
   *       type: 'text'
   *     },
   *     {
   *       name: 'quantity',
   *       type: 'integer',
   *       operator: '<'
   *     }
   *   ],
   *   ' AND ');
   *
   * returns:
   *   'id = $1::integer AND name = $2::text AND quantity < $3::integer'
   *
   * @param {array} attributes Clause attributes with the format above.
   * @param {string} separator Separator between attributes (ex. ' AND ').
   * @param {integer=?} offset Custom offset to use for variable numbers.
   *                           Normally starts at 1 (offset = 0).
   * @returns {string} A clause compatible with node-postgres.
   */
  _assignment(attributes, separator, offset) {
    if (!attributes || !attributes.length) {
      throw new Error('QueryUtils._assignment requires non-empty attributes.');
    }

    if (!separator) {
      throw new Error('QueryUtils._assignment requires a separator.');
    }

    offset = (offset || 0) + 1;

    let query = '';

    for (let i = 0; i < attributes.length; i++) {
      if (i !== 0) {
        query += separator;
      }

      const op = attributes[i].operator || '=';

      // Variable number
      const vNum = i + offset;

      query += `${attributes[i].name} ${op} $${vNum}::${attributes[i].type}`;
    }

    return query;
  }

  /**
   * An attribute list sql clause builder utility function.
   *
   * Examples:
   * QueryUtils._list(['id', 'name']); => 'id, name'
   * QueryUtils._list([]); => '*'
   *
   * @param {array} attributes Clause attributes with the format above.
   * @returns {string} An attribute list.
   */
  _list(attributes) {
    let selectClause = '';

    if (!attributes || !attributes.length) {
      // Includes all attributes
      selectClause += '*';
    } else {
      for (let i = 0; i < attributes.length; i++) {
        if (i !== 0) {
          selectClause += ', ';
        }

        selectClause += attributes[i];
      }
    }

    return selectClause;
  }
}

module.exports = new QueryUtils();
