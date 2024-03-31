const ytdl = require("ytdl-core");
const ytpl = require("ytpl");


const generateDownloadLink = async (url) => {
  const videoID = await ytdl.getURLVideoID(url);
  let info = await ytdl.getInfo(videoID);
  let audioFormats = await ytdl.filterFormats(info.formats, "audioonly");
  const { title, thumbnails } = info.videoDetails;
  const songUrl = audioFormats[0].url;
  const songName = title.slice(0, 20);
  const thumbnailUrl = thumbnails[thumbnails.length - 1].url;
  return { songName, songUrl, thumbnailUrl };
};

module.exports = generateDownloadLink;
