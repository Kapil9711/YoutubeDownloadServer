// ***************************importing section started*********************
const start = require("../downloader/start");
const youtubeModel = require("../models/models");
const YoutubeUrlModel = require("../models/UrlModel");

// ***************************importing section ended*********************

const saveUrlInDB = async (urlObj) => {
  try {
    const urlExist = await YoutubeUrlModel.findOne(urlObj);
    if (urlExist) {
      console.log("url already exists");
      return;
    }
    const saveUrl = await YoutubeUrlModel.create(urlObj);
    console.log("url saved");
  } catch (error) {
    console.log("error occur in saving the url");
  }
};

const createDownloadLink = async (req, res) => {
  try {
    const alreadyExist = await YoutubeUrlModel.findOne(req.body);
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
    // const urlExist = await YoutubeUrlModel.findOne(req.body);
    // if (urlExist) return res.send("songs already exists");
    const { url } = req.body;
    const songObj = await start(url, saveUrlInDB);
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

const feedUrl = async () => {
  try {
    await youtubeModel.deleteMany({});
    console.log("deleted");
    const allUrls = await YoutubeUrlModel.find({});
    for (let urlObj of allUrls) {
      const { url } = urlObj;

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
        console.log(songCreated);
      }
    }
  } catch (error) {
    console.log("error in saving the song ");
  }
};

module.exports = {
  createDownloadLink,
  createDataInDataBase,
  getAllSongs,
  feedUrl,
  saveUrlInDB,
};
