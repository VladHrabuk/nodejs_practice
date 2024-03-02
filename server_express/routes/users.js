const express = require("express");
const { storage } = require("config");
const {
  getAllUsers,
  addUser,
  findUser,
  deleteUser,
} = require(`../controllers/userController_${storage.type}`);
const bodyValidator = require("../middlewares/userData");
const userIdValidator = require("../middlewares/userId");
const { tryCatch } = require("../middlewares/errorHandler");
const CustomError = require("../utils/customError");

const router = express.Router();

router.post("/", bodyValidator, async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = { username, email };
    const userWithId = await addUser(newUser);
    res.status(201).json(userWithId);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      res.status(400).json({ message: "Email already exists" });
    } else {
      console.error("Error adding user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json(users);
});

router.get(
  "/:userId",
  userIdValidator,
  tryCatch(async (req, res) => {
    const { userId } = req.params;
    const user = await findUser(userId);
    if (!user) {
      throw new CustomError("User not found!", 404);
    }
    res.status(200).json(user);
  })
);

router.delete(
  "/:userId",
  userIdValidator,
  tryCatch(async (req, res) => {
    const { userId } = req.params;
    const deletedUser = await deleteUser(userId);
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
