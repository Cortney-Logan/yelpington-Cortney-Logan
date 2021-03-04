const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("./client/public"));

//allows users to visit the route /api and see all available restaurant IDs in JSON format
app.get("/api", (req, res) => {
  res.sendFile(path.resolve("./api/restaurants.json"))
});

//allows users to visit the route /api and see all available restaurant IDs in JSON format
app.get("/api/:restaurant", (req, res) => {
  res.sendFile(path.resolve(`./api/${req.params.restaurant}.json`))
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

app.listen(port, () => {
  console.log("listening on port", port);
});
