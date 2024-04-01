const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const generateDownloadLink = require("./generalLinks");

const start = async (url, saveUrlInDB) => {
  try {
    const songObj = {};
    let count = 1;
    if (url.includes("playlist")) {
      console.log(true);
      const playlist = await ytpl(url);
      for (let ele of playlist.items) {
        try {
          const url = ele.url;
          try {
            await saveUrlInDB({ url });
          } catch (error) {
            console.log(error);
          }
          songObj["song" + count] = await generateDownloadLink(url);
          console.log(count);
          count++;
        } catch (error) {}
      }
    } else {
      console.log(false);
      songObj["song" + count] = await generateDownloadLink(url);
    }
    return songObj;
  } catch (error) {
    return error;
  }
};

module.exports = start;
