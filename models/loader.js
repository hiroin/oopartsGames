'use strict';
const { Client } = require('pg')

const client = new Client({
  user: 'nobody',
  host: 'erogamescape.dyndns.org',
  database: 'ap2',
  password: 'nobody',
  port: 5432,
});

module.exports = {
  client: client
};