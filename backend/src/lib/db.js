/**
 * This module exposes a db client pool.
 *
 * Usage Example:
 *
 * const pool = require('./lib/db');
 *
 * pool.query('SELECT $1::text as name', ['brian'])
 *   .then(res => {
 *     console.log(res.rows[0].name); // brian
 *   })
 *   .catch(e => {
 *     console.error('query error', e.message, e.stack);
 *   });
 */

const pg = require('pg');
const Bluebird = require('bluebird');

/**
 * Database client pool configuration options.
 *
 * Note: Connection credentials are set through environment variables.
 *
 * @type {Object}
 */
const config = {
  Promise: Bluebird, // Use bluebird instead of native promises for performance.
  max: process.env.PGPOOLMAX, // Set max pool size.
  min: process.env.PGPOOLMIN, // Set min pool size.
  idleTimeoutMillis: process.env.PGPOOLIDLE // Close idle clients after x ms.
};

// Initialize the connection pool.
const pool = new pg.Pool(config);

pool.on('error', (err, client) => {
  // If a client is idle in the pool and receives an error.
  // For example, when your PostgreSQL server restarts the pool will catch the
  // error & let you handle it here.
  console.error('Idle pg client error', err.message, err.stack);
});


// Expose the client pool.
module.exports = pool;
