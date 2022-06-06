const express = require("express");
const { getSongs } = require("../../controller/songController");

const songRouter = express.Router();
songRouter.get("/songs", getSongs);

module.exports = songRouter;
