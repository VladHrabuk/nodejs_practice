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
  return userWithId;
}

function findUser(userId) {
  return users.find((user) => user.id === parseInt(userId));
}

function deleteUser(userId) {
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));
  if (userIndex === -1) return null;
  return users.splice(userIndex, 1)[0];
}

module.exports = {
  loadUsers,
  saveUsers,
  getAllUsers,
  addUser,
  findUser,
  deleteUser,
};
