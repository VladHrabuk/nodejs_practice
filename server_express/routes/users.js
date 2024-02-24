const express = require("express");
const {
  getAllUsers,
  addUser,
  findUser,
  deleteUser,
} = require("../controllers/userController");
const bodyValidator = require("../middlewares/userData");
const userIdValidator = require("../middlewares/userId");
const { tryCatch } = require("../middlewares/errorHandler");
const CustomError = require("../utils/customError");

const router = express.Router();

router.post("/", bodyValidator, (req, res) => {
  const { username, email } = req.body;
  const newUser = { username, email };
  const userWithId = addUser(newUser);
  res.status(201).json(userWithId);
});

router.get("/", (req, res) => {
  const users = getAllUsers();
  res.status(200).json(users);
});

router.get(
  "/:userId",
  userIdValidator,
  tryCatch((req, res) => {
    const { userId } = req.params;
    const user = findUser(userId);
    if (!user) {
      throw new CustomError("User not found!", 404);
    }
    res.status(200).json(user);
  })
);

router.delete(
  "/:userId",
  userIdValidator,
  tryCatch((req, res) => {
    const { userId } = req.params;
    const deletedUser = deleteUser(userId);
    if (!deletedUser) {
      throw new CustomError("User not found!", 404);
    }
    res
      .status(204)
      .json({ message: "User was successfully deleted!", deletedUser });
  })
);

module.exports = {
  router,
};
