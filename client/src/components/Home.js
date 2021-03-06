import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker,Popup } from "react-leaflet";

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

  // useEffect(()=>{
  //   if(!markerObject){
  //     fetch('/api/all').then(console.log('retrieved'))
  //   }
  // })

  //need to generate this object
  let markerObjectTest = {
    "rising-tide": {"coord": [43.665513, -70.2572199], "name": "Rising Tide"},
    "austin-street": {"coord": [43.6650441, -70.2576206], "name": "Austin Street"},
    definitive: {"coord":[43.7026311, -70.3191016],"name": "Rising Tide"},
    allagash: {"coord":[43.7030958, -70.3178459],"name": "Rising Tide"},
    foundation: {"coord":[43.7029012, -70.3199941],"name": "Rising Tide"},
    "battery-steel": {"coord":[43.7029012, -70.3199941],"name": "Rising Tide"},
    "bissel-brothers": {"coord":[43.6515, -70.2905],"name": "Rising Tide"},
    "mast-landing": {"coord":[43.67648235, -70.3695798359081],"name": "Rising Tide"},
    "lone-pine": {"coord":[43.6703981, -70.2559643],"name": "Rising Tide"},
    bunker: {"coord":[43.6525826, -70.2838257],"name": "Rising Tide"},
    oxbow: {"coord":[43.664967, -70.251183],"name": "Rising Tide"},
    "urban-farm-fermentory": {"coord":[43.6692111, -70.2561038],"name": "Rising Tide"},
    "flight-deck": {"coord":[43.89915165, -69.9274126279233],"name": "Rising Tide"},
    "maine-beer-company": {"coord":[43.83922605, -70.120947469974],"name": "Rising Tide"},
    shipyard: {"coord":[43.6615850999999, -70.2486231394133],"name": "Rising Tide"}
  };

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
          center={[43.68, -70.30]}
          zoom={12}
          style={{ height: "600px", width: "600px" }}
        >
          <TileLayer
            url='https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          {breweries.map((brewery, index) => {
            return (
              <Marker position={markerObjectTest[brewery].coord} key={index}>
                <Popup><Link to={`/brewery/${brewery}`}>{markerObjectTest[brewery].name}</Link></Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
export default Home;
