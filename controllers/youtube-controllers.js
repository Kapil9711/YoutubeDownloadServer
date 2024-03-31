// ***************************importing section started*********************
const start = require("../downloader/start");
const youtubeModel = require("../models/models");

// ***************************importing section ended*********************

const createDownloadLink = async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const data = await start(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const getAllSongs = async (req, res) => {
  try {
    const allSongs = await youtubeModel.find({});
    res.status(200).send(allSongs);
  } catch (error) {
    res.status(500).json({ msg: "error occor in geting all songs", error });
  }
};

const createDataInDataBase = async (req, res) => {
  try {
    const { url } = req.body;
    const songObj = await start(url);
    for (let song in songObj) {
      const songDetails = songObj[song];
      const songExist = await youtubeModel.findOne({
        songName: songDetails.songName,
      });
      if (songExist) {
        console.log("already exist");
        continue;
      }
      const songCreated = await youtubeModel.create(songDetails);
    }
    res.status(201).json({ msg: "created" });
  } catch (error) {
    res.status(500).json({ msg: "failed to add", error });
  }
};

module.exports = { createDownloadLink, createDataInDataBase, getAllSongs };
