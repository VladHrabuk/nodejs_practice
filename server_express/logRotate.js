const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");

function morganLogger() {
  const logStream = rfs.createStream("server_express.log", {
    path: path.join(__dirname, "logs"),
    size: "1M",
    interval: "1h",
    rotate: 1,
  });
  const loggerMiddleware = morgan((tokens, req, res) => {
    const logMessage = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
    ].join(" ");

    if (res.statusCode < 400) {
      logStream.write(logMessage + "\n");
    }

    return logMessage;
  });

  return loggerMiddleware;
}

module.exports = { morganLogger };
