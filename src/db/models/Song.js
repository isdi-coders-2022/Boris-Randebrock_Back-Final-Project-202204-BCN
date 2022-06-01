const { Schema, model } = require("mongoose");

const SongSchema = new Schema({
  artist: {
    type: String,
    require: true,
  },
  youtubeVideo: {
    type: String,
  },
  songTitle: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  description: {
    type: String,
  },
  documents: {
    lyrics: {
      type: String,
    },
    guitarTabs: {
      type: String,
    },
    guitarChords: {
      type: String,
    },
    bassTabs: {
      type: String,
    },
    piano: {
      type: String,
    },
    drums: {
      type: String,
    },
    saxophone: {
      type: String,
    },
    trumpets: {
      type: String,
    },
  },
});

const Song = model("Song", SongSchema, "songs");

module.exports = Song;
