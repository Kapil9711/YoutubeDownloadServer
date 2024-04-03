const { Schema, model } = require("mongoose");

const TrendingSchema = new Schema({
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

module.exports = model("YoutubeTrendingModel", TrendingSchema);
