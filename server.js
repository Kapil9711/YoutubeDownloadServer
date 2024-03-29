const express = require("express");
const cors = require("cors");
const app = express();
const start = require("./downloader");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is listening");
});
app.post("/download", async (req, res) => {
  try {
    console.log(req.body);
    const { url } = req.body;
    const data = await start(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
});
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server is Listing on port ${port}`));

const url =
  "https://www.youtube.com/playlist?list=PLMHt1AwZySBxYtheucUhzm8spzSaRqQLm";
