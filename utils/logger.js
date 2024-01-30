const colors = require("colors/safe");
require("dotenv").config();
const config = require("config");

console.log("Logger is initialized!");

colors.setTheme({
  infoColor: "bgGreen",
  warnColor: "bgYellow",
  debugColor: "bgBlue",
  errorColor: "bgRed",
});

function logger(moduleName) {
  const colorEnabled = config.get("colorEnabled");
  const logLevel = config.get("logLevel");

  return {
    info: (...args) => {
      if (logLevel === "info") {
        console.log(
          colorEnabled ? colors.infoColor(`${moduleName}:`) : `${moduleName}:`,
          ...args
        );
      }
    },
    warn: (...args) => {
      if (logLevel !== "error") {
        console.warn(
          colorEnabled ? colors.warnColor(`${moduleName}:`) : `${moduleName}:`,
          ...args
        );
      }
    },
    error: (...args) => {
      console.error(
        colorEnabled ? colors.errorColor(`${moduleName}:`) : `${moduleName}:`,
        ...args
      );
    },
  };
}

console.log(config);
module.exports = logger;
