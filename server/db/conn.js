const Sequelize = require("sequelize");
const config = {};

require("dotenv").config();

if (process.env.QUIET) {
  config.logging = false;
}
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/fsa_stackathon",
  config
);

module.exports = conn;
