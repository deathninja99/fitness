const { Client } = require("pg"); // imports the pg module

const client = new Client("postgres://localhost:5432/fitness");

module.exports = {
  client,
};
