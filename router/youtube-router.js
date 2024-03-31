// ***************************importing section started*********************

const express = require("express");
const router = express.Router();

const { createDownloadLink } = require("../controllers/youtube-controllers");

// ***************************importing section ended*********************

// ***************************routing section started*********************

router.route("/download").post(createDownloadLink);

// ***************************routing section started*********************

module.exports = router;
