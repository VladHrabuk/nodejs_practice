const colors = require("colors/safe");
const config = require("config");

console.log("Logger is initialized!");

colors.setTheme({
  infoColor: "bgGreen",
  warnColor: "bgYellow",
  debugColor: "bgBlue",
  errorColor: "bgRed",
});

function logger(moduleName) {
  const logLevel = config.logLevel;
  if (config.colorEnabled) {
    colors.enable();
  } else {
    colors.disable();
  }

  return {
    info: (...args) => {
      if (logLevel === "info") {
        console.log(colors.infoColor(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      if (logLevel !== "error") {
        console.warn(colors.warnColor(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      console.error(colors.errorColor(`${moduleName}:`), ...args);
    },
  };
}

console.log(config);
module.exports = logger;
