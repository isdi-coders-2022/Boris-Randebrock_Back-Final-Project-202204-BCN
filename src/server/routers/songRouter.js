const express = require("express");
const { getSongs, deleteSong } = require("../../controller/songController");

const songRouter = express.Router();

songRouter.get("/songs", getSongs);
songRouter.delete("/songs/:id", deleteSong);

module.exports = songRouter;
