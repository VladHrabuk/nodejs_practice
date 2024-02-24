const fs = require("fs").promises;
const fsSync = require("fs");

const path = require("path");

let users = [];
let userIdCounter = 0;

function loadUsers() {
  try {
    const data = fsSync.readFileSync(path.join(__dirname, "..", "users.json"));
    users = JSON.parse(data);
    if (users.length > 0) {
      userIdCounter = users[users.length - 1].id;
    }
  } catch (err) {
    console.error("Error loading users:", err);
  }
}

async function saveUsers() {
  try {
    await fs.writeFile(
      path.join(__dirname, "..", "users.json"),
      JSON.stringify(users, null, 2)
    );
  } catch (err) {
    console.error("Error saving users:", err);
  }
}

function getAllUsers() {
  return users;
}

function addUser(newUser) {
  userIdCounter++;
  const userWithId = { id: userIdCounter, ...newUser };
  users.push(userWithId);
}

async function findUser(userId) {
  try {
    const user = await users.find((user) => user.id === parseInt(userId));
    return user;
  } catch (err) {
    return null;
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = users.find((user) => user.id === parseInt(userId));
    users = users.filter((user) => user.id !== parseInt(userId));
    return deletedUser;
  } catch (err) {
    return null;
  }
}

module.exports = {
  loadUsers,
  saveUsers,
  getAllUsers,
  addUser,
  findUser,
  deleteUser,
};
