const fs = require("fs").promises;
const path = require("path");

let users = [];

async function loadUsers() {
  try {
    const data = await fs.readFile(path.join(__dirname, "..", "users.json"));
    users = JSON.parse(data);
    console.log(users, "loadUsers");
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
  const userId = users.length + 1;
  const userWithId = { ...newUser, id: userId };
  users.push(userWithId);
  console.log(users);
}

module.exports = {
  loadUsers,
  saveUsers,
  getAllUsers,
  addUser,
};
