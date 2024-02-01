require("dotenv").config();
const logger = require("./utils/logger")("main");
const fileSync = require("./file_sync");

// logger.info("Info!");
// logger.warn("Warn!");
// logger.error("Error!");

fileSync
  .start()
  .then(() => {
    logger.info("Task of synchronization completed!");
  })
  .catch((error) => {
    logger.error("Error occurred during synchronization:", error);
  });
