console.log("Logger is initialized!");

function logger(moduleName) {
  return {
    info: (message) => console.log(`${moduleName}: ${message}`),
    warn: (message) => console.warn(`${moduleName}: ${message}`),
    error: (message) => {
      console.error(`${moduleName}: ${message}`);
      process.exit(1);
    },
  };
}

module.exports = logger;
