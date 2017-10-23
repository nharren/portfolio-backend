const { Pool } = require('pg');
const diagnostics = require('../modules/diagnostics');
const queries = require('./queries');
const pool = new Pool();

let db = {};

db.query = function(text, params) {
  return pool.query(text, params)
             .catch(error => diagnostics.reportIf(error));
}

db.ensureTables = function() {
  db.query(queries.ensureTables);
}

module.exports = db;