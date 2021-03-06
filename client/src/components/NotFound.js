import beerPic from "./images/cheers.svg";

function NotFound(props) {
  //404 page content
  return (
    <div id="not-found-container">
      <img src={beerPic} alt="two beers clinking"></img>
      <h3>We're sorry, this page is tapped out and not available</h3>
    </div>
  );
}
export default NotFound;
