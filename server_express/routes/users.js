const express = require("express");
const { getAllUsers, addUser } = require("../controllers/userController");
const bodyValidator = require("../middlewares/userData");

const router = express.Router();

router.post("/", bodyValidator, async (req, res) => {
  const { username, email } = req.body;
  const newUser = { username, email };
  addUser(newUser);
  res.status(200).json(newUser);
});

router.get("/", (req, res) => {
  const users = getAllUsers();
  res.status(200).json(users);
});

router.get("/:userId", (req, res) => {
  res.send(200, JSON.stringify("status OK"));
});

router.delete("/:userId", (req, res) => {
  res.send(200, JSON.stringify("status OK"));
});

module.exports = {
  router,
};
