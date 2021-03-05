import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Map from "./Map.js";

function Home(props) {
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    if (breweries.length === 0) {
      fetch("/api")
        .then((res) => res.json())
        .then((breweryList) => {
          setBreweries(breweryList);
        });
    }
  });

  function capitalize(str){
    let strArray=str.split(' ');
    let i=0;
    while(i<strArray.length){
      strArray[i]=strArray[i][0].toUpperCase()+strArray[i].slice(1).toLowerCase()
      i++;
    }
    console.log(strArray)
    return strArray.join(' ');
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
      <div id="map-container">
        <MapContainer
          center={[43.6591, -70.2568]}
          zoom={13}
          style={{ height: "600px", width: "600px" }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          />
        </MapContainer>
      </div>
    </div>
  );
}
export default Home;

{/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
