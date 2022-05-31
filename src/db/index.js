require("dotenv").config();
const debug = require("debug")("src:database");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(
          chalk.redBright("Error on connecting to database:", error.message)
        );
        reject();
        return;
      }
      debug(chalk.greenBright("Connected to database"));
      resolve();
    });
  });

module.exports = connectDB;
