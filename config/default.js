const colorEnabled = process.env.COLORS_ENABLED === "1";
const logLevel = process.env.LOG_LEVEL || "warn";

module.exports = {
  colorEnabled,
  logLevel,
  logger: {
    color_enabled: process.env.COLORS_ENABLED,
    log_level: process.env.LOG_LEVEL,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};
