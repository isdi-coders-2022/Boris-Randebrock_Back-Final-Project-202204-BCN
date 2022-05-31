require("dotenv").config();
const debug = require("debug")("src:root");
const chalk = require("chalk");
const connectDB = require("./db");

const initializeServer = require("./server/initializeServer");

const port = process.env.SERVER_PORT ?? 4000;
const connectionString = process.env.MONGO_PORT;

(async () => {
  try {
    await initializeServer(port);
    await connectDB(connectionString);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
