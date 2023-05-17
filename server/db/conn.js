const Sequelize = require("sequelize");
const config = {};

if (process.env.QUIET) {
  config.logging = false;
}
// const conn = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost/fsa_stackathon",
//   config
// );

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/fsa_stackathon"
);

module.exports = conn;
