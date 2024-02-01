const path = require("path");
const fs = require("fs").promises;
const logger = require("./utils/logger")("file_sync");

async function copyFile(sourcePath, targetPath) {
  try {
    await fs.copyFile(sourcePath, targetPath, fs.constants.COPYFILE_EXCL);
    logger.info(`File copied from the ${sourcePath} to the ${targetPath}`);
  } catch (error) {
    logger.warn(`File already exists in the ${targetPath} directory`);
  }
}

async function synchronizeDirectories(sourceDir, targetDir) {
  try {
    const filesAndDirectories = await fs.readdir(sourceDir, {
      recursive: true,
    });
    await Promise.all(
      filesAndDirectories.map(async (fileOrDirectory) => {
        const sourcePath = path.join(sourceDir, fileOrDirectory);
        const targetPath = path.join(targetDir, fileOrDirectory);

        try {
          const stats = await fs.stat(sourcePath);
          if (stats.isFile()) {
            await copyFile(sourcePath, targetPath);
          } else if (stats.isDirectory()) {
            await fs.mkdir(targetPath, { recursive: true });
          }
        } catch (error) {
          logger.error(`Error copying files: ${sourcePath}`, error);
        }
      })
    );
  } catch (error) {
    logger.error(`Error reading source directory: ${sourceDir}`, error);
  }
}

async function start() {
  const sourceDir = path.join(__dirname, "source");
  const targetDir = path.join(__dirname, "target");

  await synchronizeDirectories(sourceDir, targetDir);
  logger.info("Synchronization completed!");
}

module.exports = { start };
