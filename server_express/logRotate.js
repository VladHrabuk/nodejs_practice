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
  return morgan(
    (tokens, req, res) => {
      const logMessage = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
      ].join(" ");
      console.log(logMessage);
      return logMessage;
    },
    {
      stream: logStream,
      skip: (_req, res) => res.statusCode > 400,
    }
  );
}

module.exports = { morganLogger };
