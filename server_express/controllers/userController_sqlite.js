const knexLib = require("knex");
const knexConfig = require("../../knexfile");

const knex = knexLib(knexConfig.development);

async function getAllUsers() {
  const users = await knex.select().from("users");
  return { users };
}

async function addUser(newUser) {
  const [user] = await knex("users").insert(newUser).returning("*");
  return user;
}

async function findUser(userId) {
  return knex.select().from("users").where({ id: userId }).first();
}

async function deleteUser(userId) {
  return knex.select().from("users").where({ id: userId }).del();
}

module.exports = {
  getAllUsers,
  addUser,
  findUser,
  deleteUser,
};
