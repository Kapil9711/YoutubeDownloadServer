const { Schema, model } = require("mongoose");

const youtubeUrl = new Schema({
  url: {
    type: String,
    require: true,
  },
});

module.exports = model("YoutubeUrlModel", youtubeUrl);
