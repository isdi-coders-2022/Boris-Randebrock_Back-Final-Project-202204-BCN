require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("src:controller:songController");
const Song = require("../db/models/Song");
const CustomError = require("../utils/customError");

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

const deleteSong = async (req, res) => {
  debug(chalk.greenBright("Song delete request received"));

  const { id } = req.params;
  await Song.findByIdAndDelete(id);
  res.status(200).json({ message: "Song deleted" });
};

const getSongById = async (req, res, next) => {
  const { id: currentId } = req.params;

  try {
    const song = await Song.findById(currentId);
    if (song) {
      res.status(200).json({ song });
    } else {
      next(CustomError(404, "Song not found"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getSongs, deleteSong, getSongById };
