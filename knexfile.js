/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./server_express/data/dev.sqlite3",
    },
  },
  useNullAsDefault: true,
};
