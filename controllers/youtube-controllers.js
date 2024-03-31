// ***************************importing section started*********************
const start = require("../downloader/start");

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

module.exports = { createDownloadLink };
