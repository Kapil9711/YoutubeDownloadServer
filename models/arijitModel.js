const { Schema, model } = require("mongoose");

const ArijitSchema = new Schema({
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

module.exports = model("YoutubeArijitModel", ArijitSchema);
