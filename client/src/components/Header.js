import logo from "./images/rating_empty.svg";
import { Link } from "react-router-dom";

function Header(props) {
  //header content, contains 'logo' and links to homepage
  return (
    <div id="header-container">
      <header id="header">
        <Link to={"/"}>
          <h1>
            <img id="header-logo" src={logo} alt="map marker with star" />
            yelpington
          </h1>
          <p>Greater-Portland Beer Edition</p>
        </Link>
      </header>
    </div>
  );
}
export default Header;
