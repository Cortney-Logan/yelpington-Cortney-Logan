import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

//Home Page
function Home(props) {
  //initiates breweries to hold list of brewery ids
  const [breweries, setBreweries] = useState([]);
  //initiates markerObject to store lat long, name and address for each brewery to be used in setting up map markers
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

  //fetches all brewery data in json object from api and sends to generateMarkerObject function
  useEffect(() => {
    if (!markerObject) {
      fetch("/collect")
        .then((res) => res.json())
        .then(generateMarkerObject);
    }
  });

  //accepts full list of brewery data from api and stores relevant data in state (markerObject)
  function generateMarkerObject(breweryData) {
    //declares temporary object to hold brewery data as updated
    let tempObj = {};
    //for each brewery in set of breweryData send from api, create an object in tempObj that contains lat,long, name and address
    for (let brewery of breweryData) {
      tempObj[brewery.id] = {
        coord: [brewery.lat, brewery.long],
        name: brewery.name,
        address: brewery.address,
      };
    }
    //sets markerObject
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
    // home page container for all home page content
    <div id="home-page-container">
      {/* //nav bar to store list of breweries */}
      <nav id="nav-bar">
        <ul>
          {/* //for each brewery in breweries state, create an li and add link to specific brewery page */}
          {breweries.map((brewery, index) => {
            return (
              <h4 key={index}>
                <Link to={`/brewery/${brewery}`}>
                  {/* sanitizes brewery id */}
                  {capitalize(brewery.replaceAll("-", " "))}
                </Link>
              </h4>
            );
          })}
        </ul>
      </nav>

      {/* container for map on home page */}
      <div id="homepage-map-container">
        {/* map is centered just off center of portland */}
        <MapContainer
          center={[43.68, -70.3]}
          zoom={12}
          style={{ height: "600px", width: "600px" }}
        >
          {/* tile layer */}
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          {/* for each brewery, a marker is generated with link to specific brewery page */}
          {breweries.map((brewery, index) => {
            return (
              <Marker
                // guard clause to avoid errors before markerObject is updated. Default is marker at center of map
                position={
                  markerObject ? markerObject[brewery].coord : [43.68, -70.3]
                }
                key={index}
              >
                {/* pop up is generated on each marker with brewery name and address */}
                <Popup key={index}>
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
