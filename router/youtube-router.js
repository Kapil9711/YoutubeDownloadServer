// ***************************importing section started*********************

const express = require("express");
const router = express.Router();

const {
  createDownloadLink,
  createDataInDataBase,
  getAllSongs,
  createArijitSongs,
  getArijitSongs,
} = require("../controllers/youtube-controllers");

// ***************************importing section ended*********************

// ***************************routing section started*********************

router.route("/download").post(createDownloadLink);
router.route("/createSongs").post(createDataInDataBase);
router.route("/getAllSongs").get(getAllSongs);
router.route("/createarijit").post(createArijitSongs);
router.route("/getarijitsongs").get(getArijitSongs);

// ***************************routing section started*********************

module.exports = router;
