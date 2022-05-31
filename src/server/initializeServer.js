require("dotenv").config();
const debug = require("debug")("src:server:initializeServer");
const chalk = require("chalk");
const app = require(".");

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.greenBright(`Server listening on port ${port}`));
      resolve();
    });
    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.redBright(`Port ${port} in use`));
        reject();
      }
    });
  });

module.exports = initializeServer;
