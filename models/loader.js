'use strict';
const { Client } = require('pg')

const client = new Client({
  user: 'nobody',
  host: '133.242.5.152',
  database: 'ap2',
  password: 'nobody',
  port: 5432,
});

module.exports = {
  client: client
};