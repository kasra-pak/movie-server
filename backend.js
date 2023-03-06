const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const needle = require("needle");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/movie_api", (req, res) => {
  const keyName = process.env.API_KEY_NAME;
  const keyValue = process.env.API_KEY_VALUE;
  const baseURL = process.env.API_BASE_URL;
  const method = req.query.method;
  const query = req.query.q;

  const params = {
    [keyName]: keyValue,
    query: query,
  };

  // 'https://api.themoviedb.org/3/trending/all/week'

  needle.request("get", `${baseURL}${method}`, params, (err, resp) => {
    res.json(resp.body);
  });
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
