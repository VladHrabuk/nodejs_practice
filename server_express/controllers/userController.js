const fs = require("fs");
const path = require("path");

let users = [];

function loadUsers() {
  try {
    const data = fs.readFileSync(path.join(__dirname, "..", "users.json"));
    users = JSON.parse(data);
  } catch (err) {
    console.error("Error loading users:", err);
  }
}

function saveUsers() {
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "users.json"),
      JSON.stringify(users, null, 2)
    );
    console.log("Users data saved successfully");
  } catch (err) {
    console.error("Error saving users:", err);
  }
}

function getAllUsers() {
  return users;
}

module.exports = {
  loadUsers,
  saveUsers,
  getAllUsers,
};
