require("dotenv").config();
const config = require("config");
const http = require("http");
const logger = require("./utils/logger")("server");

const { port: serverPort } = config.server;
const server = http.createServer();
server.listen(serverPort);

server.on("listening", () =>
  logger.info(`Server listening on [${serverPort}] port`)
);
server.on("request", (req) => logger.info(req.method, req.url));

server.on("request", (req, res) => {
  if (req.method === "GET" && req.url === "/healthcheck") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("healthcheck passed");
    res.end();
  } else {
    res.writeHead(404);
    res.end();
  }
  const loggerMessage = `${req.method} ${req.url} ${res.statusCode}`;
  if (res.statusCode === 200) {
    logger.info(loggerMessage);
  } else {
    logger.error(loggerMessage);
  }
});

// graceful shutdown
process.on("SIGINT", () => {
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  });
});
