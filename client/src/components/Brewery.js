import { useState, useEffect } from "react";

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

  return (
    <div>
      <h3>This is the brewery page</h3>
      <h1>{breweryDetails && breweryDetails.name}</h1>
    </div>
  );
}
export default Brewery;
