const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');

// Initialize the database client pool.
const db = require('./lib/db');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/', routes);

function listen() {
  app.listen(config.server.port, () => {
    console.log(`Comprio API server listening on ${config.server.port}`);
  });
}

// Run the database initialization script if running in dev mode.
if (config.environment === 'development') {
  console.log('Running in development mode.');
  // Re-initialize the database
  //  - Drop and recreate tables
  //  - Populate tables with example data
  fs.readFileAsync(`${__dirname}/sql/drop.sql`)
    .then(sql => db.query(sql.toString()))
    .then(() => fs.readFileAsync(`${__dirname}/sql/create.sql`))
    .then(sql => db.query(sql.toString()))
    .then(() => fs.readFileAsync(`${__dirname}/sql/example_data.sql`))
    .then(sql => db.query(sql.toString()))
    .then(() => {
      console.log('Database tables initialized.');
      listen();
    })
    .catch(err => {
      console.error('Fatal: Failed to initialize database tables.', err);
    });
} else {
  listen();
}


module.exports = app;
