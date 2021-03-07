import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AdjustMap from "./AdjustMap.js";

//Brewery Page
function Brewery(props) {
  //initiates breweryDetails to hold object with brewery information once it is fetched from api
  const [breweryDetails, setBreweryDetails] = useState(null);

  //pull in brewery id from url path for use later
  let brewery = props.match.params.brewery;

  //fetches brewery data from api and stores in state (breweryDetails)
  useEffect(() => {
    if (!breweryDetails) {
      fetch(`/api/${brewery}`)
        .then((res) => res.json())
        .then((breweryInfo) => setBreweryDetails(breweryInfo));
    }
  });

  //sets up conditionals for breweryDetails in the case that breweryDetails hasn't populated upon page load to avoid errors
  let center = breweryDetails
    ? [breweryDetails.lat, breweryDetails.long]
    : [43.6591, -70.2568];
  let name = breweryDetails && breweryDetails.name;
  let address = breweryDetails && breweryDetails.address;
  let website = breweryDetails && breweryDetails.website;
  let phone = breweryDetails && breweryDetails.phone;
  let hours = breweryDetails ? breweryDetails.hours : {};
  let comments = breweryDetails ? breweryDetails.comments : [];
  let beer = breweryDetails ? breweryDetails.beers : [];
  let food = breweryDetails && breweryDetails.food;
  let dogFriendly = breweryDetails && breweryDetails.dogFriendly;

  //initiates array of days of week for use in hours content on page
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    // brewery container for all brewery page content
    <div id="brewery-container">
      {/* name of brewery with link to brewery's website */}
      <a href={website}>
        <h1>{name}</h1>
      </a>
      {/* information container to hold all details about brewery */}
      <div id="information-container">
        {/* map centered on brewery with marker at brewery's lat, long */}
        <div id="brewery-map-container">
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: "400px", width: "400px" }}
          >
            <AdjustMap center={center} />
            <Marker position={center}>
              <Popup>{name}</Popup>
            </Marker>
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>

        {/* location and hours container */}
        <div id="location-and-hours-container">
          {/* hours as an ul */}
          <div>
            <h3>Hours:</h3>
            <ul id="hours">
              {days.map((day,index) => {
                return (
                  <li key={index}>
                    <b>{day}</b>: {hours[day]}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* address and phone number */}
          <div>
            <h3>Location:</h3>
            <p>{address}</p>
            <p>{phone}</p>
          </div>
        </div>
      </div>
      {/* additional details about brewery */}
      <div id="additional-information">
        <p>
          <b>Food:</b> {food ? "Yes" : "No"}
        </p>
        <p>
          <b>Dog Friendly:</b> {dogFriendly ? "Yes" : "No"}
        </p>
        <p>
          <b>Beers:</b> {beer && beer.map((item,index) => <span key={index}>{item} </span>)}
        </p>
      </div>
      {/* comments container */}
      <div id="comments-container">
        <h3>Comments:</h3>
        <div id="add-a-comment-container">
          <form id="add-a-comment" method="POST" action={`/comment/${brewery}`}>
            <label>Add a comment:</label>
            <br />
            <textarea id="textarea" name="body"></textarea>
            <br />
            <input id="submit-button" type="submit" />
          </form>
        </div>
        {comments && comments.map((comment,index) => <p key={index}>"{comment}"</p>)}
      </div>
    </div>
  );
}
export default Brewery;
