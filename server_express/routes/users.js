const express = require("express");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/", (req, res) => {
  res.send(200, JSON.stringify("status OK"));
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
