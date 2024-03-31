const { Schema, model } = require("mongoose");

const youtubeSchema = new Schema({
  songName: {
    type: String,
    require: true,
  },
  songUrl: {
    type: String,
    require: true,
  },
  thumbnailUrl: {
    type: String,
    require: true,
  },
});

module.exports = model("YoutubeModel", youtubeSchema);
