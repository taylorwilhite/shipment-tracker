const { Pool } = require('pg');

// Connects using environment variables
const pool = new Pool();

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
