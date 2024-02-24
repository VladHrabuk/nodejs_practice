require("dotenv").config();
const config = require("config");
const express = require("express");

const { morganLogger } = require("./logRotate");
const { loadUsers, saveUsers } = require("./controllers/userController");
const { router: userRouter } = require("./routes/users");
const CustomError = require("./utils/customError");
const { handleErrors } = require("./middlewares/errorHandler");

const server = express();

loadUsers();

server.use(express.json());
server.use(morganLogger());
server.use("/users", userRouter);

server.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

server.use(handleErrors);

const { port: serverPort } = config.server;
const serverInstance = server.listen(serverPort, () => {
  console.log(`Server listening on [${serverPort}] port!`);
});

process.on("SIGINT", async () => {
  await saveAndShutdown();
});

async function saveAndShutdown() {
  await saveUsers();
  serverInstance.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log("Server shut down gracefully!");
    process.exit(0);
  });
}
