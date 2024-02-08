const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");
const colors = require("colors/safe");
const config = require("config");

const pathLogsDir = path.join(__dirname, "..", "logs");

if (!fs.existsSync(pathLogsDir)) {
  fs.mkdirSync(pathLogsDir);
}

const writeInfoStream = fs.createWriteStream(
  path.join(pathLogsDir, "info.log"),
  { flags: "a" }
);
const writeErrorStream = fs.createWriteStream(
  path.join(pathLogsDir, "errors.log"),
  { flags: "a" }
);

const closeStreams = () => {
  writeInfoStream.end();
  writeErrorStream.end();
};

process.on("beforeExit", closeStreams);

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
      const logMessage =
        format(new Date(), "yyyy/MM/dd HH:mm:ss") +
        ` [${moduleName}]: ${args.join(" ")}`;
      writeInfoStream.write(logMessage + "\n");
      if (logLevel === "info") {
        console.log(colors.infoColor(`${moduleName}:`), ...args);
      }
    },
    warn: (...args) => {
      const logMessage =
        format(new Date(), "yyyy/MM/dd HH:mm:ss") +
        ` [${moduleName}]: ${args.join(" ")};`;
      writeErrorStream.write(logMessage + "\n");
      if (logLevel !== "error") {
        console.warn(colors.warnColor(`${moduleName}:`), ...args);
      }
    },
    error: (...args) => {
      const logMessage =
        format(new Date(), "yyyy/MM/dd HH:mm:ss") +
        ` [${moduleName}]: ${args.join(" ")};`;
      writeErrorStream.write(logMessage + "\n");
      console.error(colors.errorColor(`${moduleName}:`), ...args);
    },
  };
}

console.log(config);
module.exports = logger;
