// psql postgres -> Start postgres terminal
// \l -> List all database
// psql -d postgres -U me -> To login with user 'me'
// \c DB_NAME -> Select database
// \dt -> List all tables
// select * from TABLE_NAME;

// ON EC2
// sudo -u postgres psql

require("dotenv").config({path: '../../.env'});
const pgp = require('pg-promise')();

const postgresDB = pgp({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS
});

module.exports = postgresDB;