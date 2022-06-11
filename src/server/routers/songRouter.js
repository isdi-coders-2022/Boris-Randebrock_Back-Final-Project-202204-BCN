const express = require("express");
const {
  getSongs,
  deleteSong,
  getSongById,
} = require("../../controller/songController");

const songRouter = express.Router();

songRouter.get("/songs", getSongs);
songRouter.delete("/songs/:id", deleteSong);
songRouter.get("/songs/:id", getSongById);

module.exports = songRouter;
