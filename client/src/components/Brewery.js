import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AdjustMap from "./AdjustMap.js";

function Brewery(props) {
  const [breweryDetails, setBreweryDetails] = useState(null);

  //pull in brewery id from url path for use later
  let brewery = props.match.params.brewery;

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
    <div id="brewery-container">
      <a href={website}>
        <h1>{name}</h1>
      </a>
      <div id="information-container">
        <div id="map-container">
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
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </MapContainer>
        </div>
        <div id="location-and-hours-container">
          <div>
            <h3>Hours:</h3>
            <ul>
              {days.map((day) => {
                return (
                  <li>
                    <b>{day}</b>: {hours[day]}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3>Location:</h3>
            <p>{address}</p>
            <a href={`tel:${phone}`}>
              <p>{phone}</p>
            </a>
          </div>
        </div>
      </div>
      <div id="additional-information">
        <p><b>Food:</b> {food ? "Yes" : "No"}</p>
        <p><b>Dog Friendly:</b> {dogFriendly ? "Yes" : "No"}</p>
        <p><b>Beers:</b> {beer && beer.map(item => <span>{item}  </span>)}</p>
      </div>
      <div id="comments-container">
        <h3>Comments:</h3>
        {comments && comments.map(comment => <p>"{comment}"</p>)}
      </div>
    </div>
  );
}
export default Brewery;
