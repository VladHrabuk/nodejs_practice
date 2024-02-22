require("dotenv").config();
const config = require("config");
const express = require("express");

const { morganLogger } = require("./logRotate");
const { loadUsers, saveUsers } = require("./controllers/userController");
const { router: userRouter } = require("./routes/users");

const server = express();

server.use(express.json());
server.use(morganLogger());
server.use("/users", userRouter);

const { port: serverPort } = config.server;
server.listen(serverPort, () => {
  console.log(`Server listening on [${serverPort}] port`);
});

loadUsers();

process.on("beforeExit", () => {
  saveUsers();
});

// server.get("/healthcheck", (req, resp) => {
//   resp.send("healthceck is passed");
// });
