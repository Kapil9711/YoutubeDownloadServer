// ***************************importing section started*********************

require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const youtubeRoutes = require("./router/youtube-router");
const connectDB = require("./db/db");

// ***************************importing section ended*********************

// ***************************middleware section started*********************

app.use(express.json());

app.use("/api/youtube", youtubeRoutes);

// ***************************middleware section ended*********************

app.get("/", (req, res) => {
  res.send("server is listening");
});

const port = process.env.PORT || 5000;

const startConnection = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is Listing on port ${port}`));
  } catch (error) {
    console.log("error in connection to db or server");
  }
};
startConnection();

const url =
  "https://www.youtube.com/playlist?list=PLMHt1AwZySBxYtheucUhzm8spzSaRqQLm";
