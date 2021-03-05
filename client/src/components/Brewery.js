import { useState, useEffect } from "react";
import { MapContainer,TileLayer } from "react-leaflet";

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

//   let center = [43.6591, -70.2568] && [breweryDetails.lat,breweryDetails.long]

  return (
    <div id="brewery-container">
      <h1>{breweryDetails && breweryDetails.name}</h1>
      <div id="location-and-hours-container">
        <div id="map-container">
          <MapContainer
            center={[43.6591, -70.2568]}
            zoom={12}
            style={{ height: "600px", width: "600px" }}
          >
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </MapContainer>
        </div>
        <div id="hours-container">
          <ul></ul>
          <p>{breweryDetails && breweryDetails.address}</p>
        </div>
      </div>
    </div>
  );
}
export default Brewery;
