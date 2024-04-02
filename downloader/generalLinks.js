const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const youtubeModel = require("../models/models");
const getIframe = require("../test");

const generateDownloadLink = async (url) => {
  const videoID = await ytdl.getURLVideoID(url);
  let info = await ytdl.getInfo(videoID);
  let audioFormats = await ytdl.filterFormats(info.formats, "audioonly");
  const { title, thumbnails } = info.videoDetails;
  let songUrl = audioFormats[0].url;
  const songName = title.slice(0, 20);
  const thumbnailUrl = thumbnails[thumbnails.length - 1].url;
  // const embedUrl = url.replace("watch", "embed");
  // let thumbnailUrl = "";
  try {
    // console.log("getting embed url");
    // thumbnailUrl = await getIframe(embedUrl);
    // console.log("recieved embeded url");
    const songExist = await youtubeModel.findOne({ songUrl });
    if (songExist) songUrl = songExist.songUrl;
  } catch (error) {
    console.log(error);
  }
  return { songName, songUrl, thumbnailUrl };
};

module.exports = generateDownloadLink;
