require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("src:controller:songController");
const Song = require("../db/models/Song");

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
    debug(chalk.bright.green("Song request received"));
  } catch (error) {
    error.StatusCode = 404;
    error.CustomMessage = "Song not found";

    next(error);
  }
};

module.exports = { getSongs };
