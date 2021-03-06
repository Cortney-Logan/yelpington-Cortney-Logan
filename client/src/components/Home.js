import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Home(props) {
  //initiates breweries to hold list of brewery ids
  const [breweries, setBreweries] = useState([]);
  //initiates markerObject to store lat long coordinates for each brewery to be used in setting up markers
  const [markerObject, setMarkerObject] = useState(null);

  //fetches list of brewery ids from api and sets in state (breweries)
  useEffect(() => {
    if (breweries.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((breweryList) => {
          setBreweries(breweryList);
        });
    }
  });

  useEffect(() => {
    if (!markerObject) {
      fetch("/collect")
        .then((res) => res.json())
        .then(generateMarkerObject);
    }
  });

  function generateMarkerObject(breweryData) {
    let tempObj = {};
    for (let brewery of breweryData) {
      tempObj[brewery.id] = {
        coord: [brewery.lat, brewery.long],
        name: brewery.name,
        address: brewery.address,
      };
    }
    setMarkerObject(tempObj);
  }

  //capitalize function to format restaurant ids
  function capitalize(str) {
    let strArray = str.split(" ");
    let i = 0;
    while (i < strArray.length) {
      strArray[i] =
        strArray[i][0].toUpperCase() + strArray[i].slice(1).toLowerCase();
      i++;
    }
    return strArray.join(" ");
  }

  return (
    <div id="home-page-container">
      <nav id="nav-bar">
        <ul>
          {breweries.map((brewery, index) => {
            return (
              <h4 key={index}>
                <Link to={`/brewery/${brewery}`}>
                  {capitalize(brewery.replaceAll("-", " "))}
                </Link>
              </h4>
            );
          })}
        </ul>
      </nav>
      <div id="homepage-map-container">
        <MapContainer
          center={[43.68, -70.3]}
          zoom={12}
          style={{ height: "600px", width: "600px" }}
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          {breweries.map((brewery, index) => {
            return (
              <Marker
                position={
                  markerObject ? markerObject[brewery].coord : [43.68, -70.3]
                }
                key={index}
              >
                <Popup>
                  <Link to={`/brewery/${brewery}`}>
                    {markerObject && markerObject[brewery].name}
                  </Link>
                  <p id="pop-up-address">
                    {markerObject && markerObject[brewery].address}
                  </p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
export default Home;
