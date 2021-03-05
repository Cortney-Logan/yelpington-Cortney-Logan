import logo from "./images/rating_empty.svg";

function Header(props) {
  return (
    <div>
      <header id="header">
        <h1><img id="header-logo" src={logo}/>yelpington</h1>
        <p>Portland Beer Edition</p>
      </header>
    </div>
  );
} export default Header;
