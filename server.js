const express = require("express");
const app = express();
const port = 2000;
const cors = require("cors");
const ytdl = require("ytdl-core");
const YoutubeMusicApi = require("youtube-music-api");

app.use(cors());

app.get("/listen", async (req, res) => {
  const { url } = req.query;

  try {
    ytdl(url, { quality: "highestaudio" }).pipe(res);
  } catch (e) {
    res.sendStatus(500);
  }
});

app.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) res.sendStatus(404);

  try {
    const api = new YoutubeMusicApi();
    api
      .initalize() // Retrieves Innertube Config
      .then((info) => {
        api.search(q, "song").then((result) => {
          res.json(result.content);
        });
      });
  } catch (e) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
