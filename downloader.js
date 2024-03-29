const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
// const url = "https://youtu.be/2CXSw1oPj3I?si=XIjBcdctfR_0aOIQ";

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

const start = async (url) => {
  try {
    const songObj = {};
    let count = 1;
    if (url.includes("playlist")) {
      console.log(true);
      const playlist = await ytpl(url);
      for (let ele of playlist.items) {
        try {
          const url = ele.url;
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

    // const noOfSongs = playlist.items.length;
    // console.log("List generated, Total songs:", noOfSongs);
    // console.log();

    // console.log("Starting the downloading");

    // let count = 1;
    // for (let ele of playlist.items) {
    //   try {
    //     const url = ele.url;
    //     const video = await ytdl(url, { filter: "audioonly", format: "webm" });
    //     const videoID = await ytdl.getURLVideoID(url);
    //     let info = await ytdl.getInfo(videoID);
    //     const songName = info.videoDetails.title.slice(0, 25);
    //     console.log();
    //     video.pipe(fs.createWriteStream(output + songName + ".mp3"));
    //     console.log(`${count}: ${songName} ---> Downloaded`);
    //     count++;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // console.log();
    // console.log("All Download Completed");
  } catch (error) {
    return error;
  }
};

module.exports = start;
