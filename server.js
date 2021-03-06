// const { response } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

//declares port variable and sets to 5000 as default
const port = process.env.PORT || 5000;

//limits scope to client/public folder
app.use(express.static("./client/public"));

//allows users to visit the route /api and see all available restaurant IDs in JSON format
app.get("/api", (req, res) => {
  res.sendFile(path.resolve("./api/restaurants.json"));
});

//allows users to visit the route /api and see all available restaurant IDs in JSON format
app.get("/api/:restaurant", (req, res) => {
  res.sendFile(path.resolve(`./api/${req.params.restaurant}.json`));
});

//supporting functions
//compiles contents of all brewery files into a single object
function allBreweries() {
  //reads the contents of the given directory - in this case api dir
  return (
    fs
      .readdirSync(path.resolve("./api"))
      //removes index file from list
      .filter((file) => file !== "restaurants.json")
      //compiles contents of all files in filtered list to a single array
      .map((file) =>
        JSON.parse(fs.readFileSync(path.join(path.resolve("./api"), file)))
      )
  );
}

app.get('/collect', (req, res) => {
  let allBreweryData = allBreweries();
  let breweryData = JSON.stringify(allBreweryData);
  res.type("text/json").send(breweryData);
});

//catch all
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//starts port and keeps it open
app.listen(port, () => {
  console.log("listening on port", port);
});

