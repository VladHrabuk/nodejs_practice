const colorEnabled = process.env.COLORS_ENABLED === "1";
const logLevel = process.env.LOG_LEVEL || "warn";
const ALLOWED_STORAGE_TYPES = ["array", "sqlite"];
const storageType = process.env.STORAGE_TYPE;

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
  storage: {
    type: ALLOWED_STORAGE_TYPES.includes(storageType)
      ? storageType
      : ALLOWED_STORAGE_TYPES[0],
  },
};
