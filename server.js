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

app.post(
  "/comment/:restaurant",
  express.urlencoded({ extended: false }),
  (req, res) => {
    let newComment = req.body;
    let breweryId = req.params.restaurant;
    console.log("body is", newComment);
    console.log("brewery is", breweryId);
    addComment(newComment, breweryId, res); //working on now
    res.redirect(`../brewery/${breweryId}`);
  }
);

//receives get request from home page to collect all brewery data for aggregation
app.get("/collect", (req, res) => {
  //sets allBreweryData variable to store JSON object from allBreweries
  let allBreweryData = allBreweries();
  //turns set of brewery data into a string to be sent to home page
  let breweryData = JSON.stringify(allBreweryData);
  //sends response of brewery data as string to home page
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

function addComment(newComment, breweryId, res) {
  console.log("inside add comment body is", newComment);
  console.log("inside add comment brewery is", breweryId);

  //pull correct json file into server.js
  let currentData = JSON.parse(fs.readFileSync(`./api/${breweryId}.json`));
  console.log(currentData);

  currentData.comments.push(newComment.body);

  console.log(`updatedData is `, currentData);

  //update comment section to include new comment
  fs.writeFileSync(`./api/${breweryId}.json`, JSON.stringify(currentData));
  //reload page

  //https://stackoverflow.com/questions/36093042/how-do-i-add-to-an-existing-json-file-in-node-js#:~:text=If%20you%20want%20the%20file,string%20and%20save%20it%20again.&text=In%20general%2C%20If%20you%20want,appendFile(%22results.
  //https://egghead.io/lessons/node-js-write-or-append-to-a-file-in-node-js-with-fs-writefile-and-fs-writefilesync
  //https://stackoverflow.com/questions/54429169/adding-dynamically-to-a-json-file
}
